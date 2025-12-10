import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.SESSION_SECRET || "dev-secret";

// OAuth2 Configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback";

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use(cors({
  origin: (origin, cb) => cb(null, origin || "http://localhost:8080"),
  credentials: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Types
interface User {
  id: number;
  email: string;
  username: string;
  googleId?: string;
  createdAt: string;
}

interface Pokemon {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
  userId: number;
  animals?: string[];
  abilities?: string[];
}

interface SharedPokemon extends Pokemon {
  sharedAt: string;
}

// In-memory storage
const users: User[] = [];
const pokemons: Pokemon[] = [];
const sharedPokemons: Map<string, SharedPokemon> = new Map();
let nextUserId = 1;

// Helper functions
function signUser(user: any) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "12h" });
}

function verifyToken(token?: string) {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

function findUserByGoogleId(googleId: string): User | undefined {
  return users.find(u => u.googleId === googleId);
}

function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Passport serialization
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || null);
});

// Google OAuth2 Strategy
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = findUserByGoogleId(profile.id);

      if (!user) {
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = findUserByEmail(email);
        }

        if (!user) {
          user = {
            id: nextUserId++,
            email: email || `user${nextUserId}@google.com`,
            username: profile.displayName || `user${nextUserId}`,
            googleId: profile.id,
            createdAt: new Date().toISOString()
          };
          users.push(user);
        } else {
          user.googleId = profile.id;
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error, undefined);
    }
  }));
}

// Request logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  (req as any).user = payload;
  next();
}

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// OAuth2 routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:8080/?error=auth_failed",
    session: true
  }),
  (req: Request, res: Response) => {
    const user = req.user as User;
    const token = signUser({ id: user.id, username: user.username, email: user.email });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    res.redirect("http://localhost:8080/?success=true");
  }
);

// Demo login endpoint (for testing without Google OAuth)
app.post("/auth/demo", (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username || username.trim().length < 2) {
    return res.status(400).json({ error: "Username must be at least 2 characters" });
  }

  const demoEmail = `${username.toLowerCase().replace(/\s+/g, '')}@demo.test`;

  // Find or create demo user
  let user = findUserByEmail(demoEmail);

  if (!user) {
    user = {
      id: nextUserId++,
      email: demoEmail,
      username: username,
      createdAt: new Date().toISOString()
    };
    users.push(user);
  }

  const token = signUser({ id: user.id, email: user.email, username: user.username });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 12 * 60 * 60 * 1000,
    sameSite: "lax"
  });
  res.json(user);
});

// Get current user
app.get("/auth/me", (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });
  res.json(payload);
});

// Logout
app.post("/auth/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) console.error("Logout error:", err);
  });
  res.clearCookie("token");
  res.json({ ok: true });
});

// Generate Pokemon image
app.post("/generate-image", requireAuth, async (req: Request, res: Response) => {
  const { prompt, animals, abilities } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  // Build enhanced prompt with animals and abilities
  let enhancedPrompt = prompt;
  if (animals && animals.length > 0) {
    enhancedPrompt += `, combined with ${animals.join(' and ')}`;
  }
  if (abilities && abilities.length > 0) {
    enhancedPrompt += `, with abilities: ${abilities.join(', ')}`;
  }

  // Use pollinations.ai for image generation with optimized parameters
  const fullPrompt = `${enhancedPrompt}, pokemon style, digital illustration, high detail, clean background`;
  // Add seed for consistency and model parameter
  const seed = Math.floor(Math.random() * 1000000);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=512&height=512&nologo=true&seed=${seed}&model=flux`;

  // Save to user's collection
  const user = (req as any).user;
  const pokemon: Pokemon = {
    id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    prompt,
    imageUrl,
    createdAt: new Date().toISOString(),
    userId: user.id,
    animals: animals || [],
    abilities: abilities || []
  };

  pokemons.push(pokemon);

  res.json(pokemon);
});

// Get user's Pokemon collection
app.get("/pokemons", requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user;
  const userPokemons = pokemons.filter(p => p.userId === user.id);
  res.json(userPokemons);
});

// Delete Pokemon
app.delete("/pokemons/:id", requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user;
  const { id } = req.params;

  const index = pokemons.findIndex(p => p.id === id && p.userId === user.id);
  if (index === -1) {
    return res.status(404).json({ error: "Pokemon not found" });
  }

  pokemons.splice(index, 1);
  res.json({ ok: true });
});

// Share Pokemon
app.post("/share", requireAuth, (req: Request, res: Response) => {
  const { pokemonId } = req.body;
  const user = (req as any).user;

  if (!pokemonId) {
    return res.status(400).json({ error: "Pokemon ID required" });
  }

  const pokemon = pokemons.find(p => p.id === pokemonId && p.userId === user.id);
  if (!pokemon) {
    return res.status(404).json({ error: "Pokemon not found" });
  }

  // Generate unique share ID
  const shareId = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;

  const sharedPokemon: SharedPokemon = {
    ...pokemon,
    sharedAt: new Date().toISOString()
  };

  sharedPokemons.set(shareId, sharedPokemon);

  const shareUrl = `http://localhost:8080/share/${shareId}`;
  res.json({ shareId, shareUrl });
});

// Get shared Pokemon (public, no auth required)
app.get("/share/:shareId", (req: Request, res: Response) => {
  const { shareId } = req.params;
  const shared = sharedPokemons.get(shareId);

  if (!shared) {
    return res.status(404).json({ error: "Shared Pokemon not found" });
  }

  res.json(shared);
});

// Get available animals and abilities lists
app.get("/options", (req: Request, res: Response) => {
  const animals = [
    "Dragon", "Tiger", "Wolf", "Eagle", "Phoenix", "Lion", "Bear",
    "Fox", "Shark", "Dolphin", "Butterfly", "Snake", "Turtle",
    "Owl", "Falcon", "Leopard", "Panda", "Rabbit", "Deer", "Elephant"
  ];

  const abilities = [
    "Fire Blast", "Water Gun", "Thunder Bolt", "Ice Beam", "Solar Beam",
    "Shadow Ball", "Psychic", "Earthquake", "Dragon Claw", "Aerial Ace",
    "Poison Jab", "Metal Claw", "Rock Slide", "Leaf Blade", "Hydro Pump",
    "Flash Cannon", "Dark Pulse", "Moonblast", "Energy Ball", "Flamethrower"
  ];

  res.json({ animals, abilities });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
