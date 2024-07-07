
# Avax Gods

<div align="center">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/web3.js-F16822?style=for-the-badge&logo=web3.js&logoColor=white" alt="Web3.js" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react" src="Context API/>
</div>


Welcome to **Avax-Gods**, where blockchain technology meets the thrill of decentralized gaming! Avax-Gods is an innovative project that allows users to immerse themselves in a world of strategy and competition. By connecting your Core or MetaMask wallet, you can create battles or join existing ones with ease. Engage in intense battles where every move counts.

![Home Image](./images/home.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Gameplay](#gameplay)
  - [Creating a Battle](#creating-a-battle)
  - [Joining a Battle](#joining-a-battle)
  - [Battle Mechanics](#battle-mechanics)
- [Game Rules](#game-rules)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Notes](#notes)


## Introduction

Avax-Gods is a strategic NFT card game built on blockchain technology. Players can connect their Core or MetaMask wallets to engage in exciting battles, utilizing their NFT cards to attack, defend, and outsmart their opponents.

![BattleGround Image](./images/battleground1.png)

## Features

- **Blockchain Integration**: Secure and transparent transactions through Core and MetaMask wallets.
- **NFT Cards**: Unique NFT cards that you can use in battles.
- **Custom Battleground**: Select your battleground from four unique types available.
- **Interactive Battle animations and sounds**: Engaging battle animations and sounds with interactive toasts add excitement and vibrancy to the game.
- **Strategy & Competition**: Plan your moves carefully to defeat your opponents.
- **Community Engagement**: Join a vibrant community of gamers and NFT enthusiasts.
- **Exiting Battle**: You can also exit the battle. 

![Battleground Options](./images/options.png)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Core or MetaMask wallet set up.
- You have some AVAX tokens in your wallet for transaction fees.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/avax-gods.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Avax-Gods
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Usage

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and go to `http://localhost:5173` to see the application in action.

## Gameplay

### Creating a Battle

1. Connect your Core or MetaMask wallet.
2. Register your account if already not registered.
3. Navigate to the "Create Battle" section.
4. Click "Create Battle" to initiate the game.
5. You can also join an existing battle

![Player Waiting Area](./images/wait.png)

### Joining a Battle

1. Connect your Core or MetaMask wallet.
2. Browse the list of available battles.
3. Select a battle to join.
4. Confirm your participation.

![Joining a Battle](./images/join.png)

### Battle Mechanics

- **Random Card Allocation**: Each player is given a card with random attack and defense values.
- **Decision Making**: Based on the card values, players can choose to either attack or defend.
- **Player Health**: Each player has a health of 25 points.
- **Hidden Opponent Values**: You cannot see your opponent's attack and defense values. Strategize your moves based on your card's values and anticipate your opponent's actions.
- **Balanced Strategy**: Focus on both attack and defense to optimize gameplay. Defending successfully refills your Mana by 3 points, enabling more attacks or defenses in subsequent turns.

![Moves Transaction](./images/moves.png)

![Battle](./images/battleground2.png)

![Battle](./images/battleground3.png)

## Game Rules

1. **Card with the same defense and attack points will cancel each other out**: When two cards with identical attack and defense points clash, they both are nullified.
2. **Attack points from the attacking card will deduct the opposing player’s health points**: The attack value directly reduces the opponent's health.
3. **If P1 does not defend, their health will be deducted by P2’s attack**: An undefended attack directly reduces the defender's health.
4. **If P1 defends, P2’s attack is equal to P2’s attack - P1’s defense**: Defending reduces the impact of the attack by the defender's defense value.
5. **If a player defends, they refill 3 Mana**: Successful defense replenishes the defender's Mana by 3 points.
6. **If a player attacks, they spend 3 Mana**: Each attack costs the attacker 3 Mana points.

![Rules](./images/rules.png)

## Tech Stack

- **Docker**: Containerization for seamless deployment.
- **JavaScript/TypeScript**: Main programming languages used in the project.
- **Hardhat**: Development environment for Ethereum-compatible smart contracts.
- **Solidity**: Programming language for writing smart contracts.
- **OpenZeppelin**: Library for secure smart contract development.
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Tailwind CSS for styling of the application.

## Contributing

We welcome contributions to Avax-Gods! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Notes

- The Solidity code for Avax-Gods is written using Solidity version ^0.8.19. Ensure your development environment is compatible with this version for optimal performance and compatibility.
- The frontend of Avax-Gods is built using React and Vite, providing a fast and modern development experience.
- A modal will open if you are not connected to the Fuji C-Chain network, prompting you to switch networks for proper functionality
- Docker is integrated into the frontend for streamlined development and deployment.

![Modal](./images/modal.png)

![Modal](./images/modal1.png)

![Modal](./images/modal2.png)










