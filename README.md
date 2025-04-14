# Sports Project

Welcome to the Sports Project! This repository is designed to provide tools, resources, and documentation for a demo solution which manages and analyzes mock, sports-related data.

Demo available [here](https://sports.courtney.cloud)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

A responsive web application that displays analytics and visualizations for a youth sports league:

1. Displays league statistics and player performance metrics
2. Visualizes team standings and game results
3. Shows player attendance and participation trends
4. Includes a responsive design that works well on both mobile and desktop

## Features

- Serverless
- Caching
- Modular and extensible design
- Authentication

## Installation

To get started, clone the repository and install the required dependencies:

```bash
git clone https://github.com/brcourt/sports-project.git
cd sports-project/frontend
pnpm install
npm run build
cd ../cdk
pnpm install
cdk deploy
```

## Documentation

The `/docs` folder contains detailed information and references:

- [Architecture](docs/Architecture.md): Outline of the backend architecture of this demo
- [Deployment](docs/Deployment.md): Detailed documentation for deploying this demo
- [Enhancements](docs/Enhancements.md): List of enhancements that would be first up if this were a real project.
- [Frontend](docs/Frontend.md): Outline of the decisions I made for the UI/UX.

## Contributing

We welcome contributions! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to get involved.

## License

This project is licensed under the [MIT License](LICENSE).

Happy coding!
