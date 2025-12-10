# Makefile pour Text to Pokémon Generator

.PHONY: all up down restart logs clean re

all: up

up:
	docker-compose up --build -d
	@echo "✅ Application démarrée"
	@echo "Frontend: http://localhost:8080"
	@echo "Backend:  http://localhost:3000"

down:
	docker-compose down

restart: down up

logs:
	docker-compose logs -f

clean:
	docker-compose down -v

re: clean up

.DEFAULT_GOAL := up
