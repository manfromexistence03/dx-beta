#!/usr/bin/env node
import type { CommandName } from '@helpers/type';
import chalk from 'chalk';
import { Command } from 'commander';
import { Logger } from '@helpers/logger';
import chalkAnimation from 'chalk-animation';
import pkg from '../package.json';
import { addAction } from './actions/add-action';
import { doctorAction } from './actions/doctor-action';
import { envAction } from './actions/env-action';
import { initAction } from './actions/init-action';
import { listAction } from './actions/list-action';
import { removeAction } from './actions/remove-action';
import { upgradeAction } from './actions/upgrade-action';
import { initStoreComponentsData } from './constants/component';
import { getStore, store } from './constants/store';
import { getComponents } from './scripts/helpers';
import Table from "../table/src/main";

// Copyright disclaimer for the CLI
const COPYRIGHT_INFO: string = `
This CLI utilizes base components and potentially leverages UI frameworks from other sources. We respect the ownership of these frameworks and aim to ensure a smooth integration experience. By using this CLI, you won't encounter missing downloads or malicious code that could compromise the security of the respective owners' work. Thank you for using our CLI!
`;
// Informational message displayed in the CLI
const CLI_INFO: string = `
This innovative solution empowers developers by automating the often-tedious process of integrating UI components.
Eliminate the need for manual configuration and repetitive tasks, and unlock a new level of development efficiency.
To maintain your current session and avoid interruption, please execute any command within the next 10s.
`;

// Options displayed in the CLI with descriptions
const CLI_OPTIONS: string = `
${chalk.hex("#ff00d9")("Options:")}
-a, --all [boolean]: Add all components
-p, --packagePath [string]: Specify the path to the package.json file
-app, --appPath [string]: Specify the path to the App.tsx file
`;

// Flags displayed in the CLI with descriptions
const CLI_FLAGS: string = `
${chalk.hex("#9500ff")("Flags:")}
--prettier [boolean]: Apply Prettier formatting to the added content
--addApp [boolean]: Include App.tsx file content that requires a provider
`;

// Examples displayed in the CLI
const CLI_EXAMPLES: string = `
${chalk.hex("#ff0080")("\nExamples:")}
npm ui suggest "what is the best library which simple and yet beautiful?"
npm ui explain "how to center a div? With a very basic and beginner explaination"
npm ui create nextjs-ui-website
npm ui init nextjs-ui-website
npm ui add -a
npm ui remove accordion
`;
const commandList: CommandName[] = ['add', 'env', 'init', 'list', 'upgrade', 'doctor', 'remove'];
const ui = new Command();

/*
      $$\                 $$\          $$\ 
      $$ |               $$  |         \__|
 $$$$$$$ |$$\   $$\     $$  /$$\   $$\ $$\ 
$$  __$$ |\$$\ $$  |   $$  / $$ |  $$ |$$ |
$$ /  $$ | \$$$$  /   $$  /  $$ |  $$ |$$ |
$$ |  $$ | $$  $$<   $$  /   $$ |  $$ |$$ |
\$$$$$$$ |$$  /\$$\ $$  /    \$$$$$$  |$$ |
 \_______|\__/  \__|\__/      \______/ \__|
                                                                                                                        
*/

ui
    .name('ui')
    .usage('[command]')
    .description(`${chalkAnimation.rainbow(
        `Dx/Ui(v${pkg.version}): Streamline UI Development with a CLI Tool for Efficient Component Integration`
    )}`)
    .version(pkg.version, '-v, --version', 'Output the current version')
    .helpOption('-h, --help', 'Display help for command')
    .allowUnknownOption()
    .action(async (_, command) => {

        console.log(CLI_INFO);
        console.log(CLI_OPTIONS);
        console.log(CLI_FLAGS);
        const header = [
            {
                value: "Command",
                headerColor: "red",
                color: "green",
                align: "left",
                width: "8%"
            },
            {
                value: "Description",
                width: "25%",
                headerColor: "magenta",
                color: "gray"
            },
            {
                value: "Arguments",
                color: "white",
                align: "center",
                width: "10%",
                headerColor: "cyan",
            }
        ]
        const rows: any[] = [
            {
                Command: "suggest",
                Description: "Suggests you about what ui component is best for your job and ai chat...",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,
            },
            {
                Command: "explain",
                Description: "Explains you what course of actions you should take to solve your ui problems...",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "create",
                Description: "Creates A new project using any frontend frameworks",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "init",
                Description: "Initializes a new project",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "add",
                Description: "Adds components to your project",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "remove",
                Description: "Removes components from the project",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "update",
                Description: "Upgrades project components to the latest versions",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "list",
                Description: "Lists all components, showing status, descriptions, and versions",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            },
            {
                Command: "doctor",
                Description: "Checks for issues in the project",
                Arguments: `${chalk.yellow.italic("[--option]")} ${chalk.blue.italic("[--flag]")}`,

            }
        ]
        const options = {
            borderStyle: "solid",
            headerAlign: "center",
            headerColor: "green",
            align: "left",
            color: "white",
            width: '80%'
        }
        const COMMAND_DETAILS = Table(header, rows, options).render();
        console.log(COMMAND_DETAILS);
        console.log(CLI_EXAMPLES);
    });

ui
    .command('suggest')
    .description('Suggests you about what ui component is best for your job and ai chat...')
    .argument('[components...]', 'Names of components to add')
    .option('-a --all [boolean]', 'Add all components', false)
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-tw --tailwindPath [string]', 'Specify the path to the tailwind.config.js file')
    .option('-app --appPath [string]', 'Specify the path to the App.tsx file')
    .option('--prettier [boolean]', 'Apply Prettier formatting to the added content', false)
    .option('--addApp [boolean]', 'Include App.tsx file content that requires a provider', false)
    .action(addAction);

ui
    .command('explain')
    .description('Explains you what course of actions you should take to solve your ui problems...')
    .argument('[components...]', 'Names of components to add')
    .option('-a --all [boolean]', 'Add all components', false)
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-tw --tailwindPath [string]', 'Specify the path to the tailwind.config.js file')
    .option('-app --appPath [string]', 'Specify the path to the App.tsx file')
    .option('--prettier [boolean]', 'Apply Prettier formatting to the added content', false)
    .option('--addApp [boolean]', 'Include App.tsx file content that requires a provider', false)
    .action(addAction);

ui
    .command('create')
    .description('Creates A new project using any frontend frameworks')
    .argument('[components...]', 'Names of components to add')
    .option('-a --all [boolean]', 'Add all components', false)
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-tw --tailwindPath [string]', 'Specify the path to the tailwind.config.js file')
    .option('-app --appPath [string]', 'Specify the path to the App.tsx file')
    .option('--prettier [boolean]', 'Apply Prettier formatting to the added content', false)
    .option('--addApp [boolean]', 'Include App.tsx file content that requires a provider', false)
    .action(addAction);

ui
    .command('init')
    .description('Initializes a new project')
    .argument('[projectName]', 'Name of the project to initialize')
    .option('-t --template [string]', 'Specify a template for the new project, e.g., app, pages')
    .action(initAction);

ui
    .command('add')
    .description('Adds components to your project')
    .argument('[components...]', 'Names of components to add')
    .option('-a --all [boolean]', 'Add all components', false)
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-tw --tailwindPath [string]', 'Specify the path to the tailwind.config.js file')
    .option('-app --appPath [string]', 'Specify the path to the App.tsx file')
    .option('--prettier [boolean]', 'Apply Prettier formatting to the added content', false)
    .option('--addApp [boolean]', 'Include App.tsx file content that requires a provider', false)
    .action(addAction);

ui
    .command('remove')
    .description('Removes components from the project')
    .argument('[components...]', 'Names of components to remove')
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-a --all [boolean]', 'Remove all components', false)
    .option('-tw --tailwindPath [string]', 'Specify the path to the tailwind.config.js file')
    .action(removeAction);

ui
    .command('upgrade')
    .description('Upgrades project components to the latest versions')
    .argument('[components...]', 'Names of components to upgrade')
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-a --all [boolean]', 'Upgrade all components', false)
    .action(upgradeAction);

ui
    .command('list')
    .description('Lists all components, showing status, descriptions, and versions')
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-r --remote', 'List all components available remotely')
    .action(listAction);

ui
    .command('env')
    .description('Displays debugging information for the local environment')
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .action(envAction);

ui
    .command('doctor')
    .description('Checks for issues in the project')
    .option('-p --packagePath [string]', 'Specify the path to the package.json file')
    .option('-tw --tailwindPath [string]', 'Specify the path to the tailwind.config.js file')
    .option('-app --appPath [string]', 'Specify the path to the App.tsx file')
    .option('-ca --checkApp [boolean]', 'Check the App.tsx file', false)
    .option('-ct --checkTailwind [boolean]', 'Check the tailwind.config.js file', true)
    .option('-cp --checkPnpm [boolean]', 'Check for Pnpm', true)
    .action(doctorAction);

ui.hook('preAction', async (command) => {
    const args = command.args?.[0];

    if (args && commandList.includes(args as CommandName)) {
        // Before run the command init the components.json
        const nextUIComponents = (await getComponents()).components;
        initStoreComponentsData(nextUIComponents);
    }

    const cliLatestVersion = await getStore('cliLatestVersion');
    const latestVersion = await getStore('latestVersion');

    // Init latest version
    store.latestVersion = latestVersion;
    store.cliLatestVersion = cliLatestVersion;
});

ui.parseAsync(process.argv).catch(async (reason) => {
    Logger.newLine();
    Logger.error('Unexpected error. Please report it as a bug:');
    Logger.log(reason);
    Logger.newLine();
    process.exit(1);
});

/*
                          $$\ 
                          $$ |
 $$$$$$\  $$$$$$$\   $$$$$$$ |
$$  __$$\ $$  __$$\ $$  __$$ |
$$$$$$$$ |$$ |  $$ |$$ /  $$ |
$$   ____|$$ |  $$ |$$ |  $$ |
\$$$$$$$\ $$ |  $$ |\$$$$$$$ |
 \_______|\__|  \__| \_______|
                          
*/
