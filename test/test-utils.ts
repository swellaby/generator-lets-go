'use strict';

import fs = require('fs');
import path = require('path');
import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('../generators/app/interfaces/project-config');
import IProjectInput = require('../generators/app/interfaces/project-input');
import IProjectScaffolder = require('../generators/app/interfaces/project-scaffolder');

import descriptionInput = require('../generators/app/inputs/description-input');
import linterInput = require('../generators/app/inputs/linter-input');
import moduleInput = require('../generators/app/inputs/module-input');
import nameInput = require('../generators/app/inputs/name-input');
import ownerInput = require('../generators/app/inputs/owner-input');
import taskRunnerInput = require('../generators/app/inputs/task-runner-input');
import typeInput = require('../generators/app/inputs/type-input');
import vscodeInput = require('../generators/app/inputs/vscode-input');

import Linter = require('../generators/app/enums/linter');
import ProjectType = require('../generators/app/enums/project-type');
import TaskRunner = require('../generators/app/enums/task-runner');

const generatorRoot = path.join(__dirname, './../../../generators/app');
const expectedGreetingMessage = yosay('Welcome to the LetsGo Generator!');
const expectedErrorMessageBase = 'Encountered an unexpected error while creating your ' +
'new project. Please try again.';

const fatalErrorMessage = 'Something awful happened! Please open an issue on GitHub';

const getExpectedErrorMessage = (errDetails: string): string => {
    return expectedErrorMessageBase + ` Error details: '${errDetails}'`;
};

const fsStats: YeomanGenerator.MemFsEditor = {
    commit: null,
    copy: null,
    copyTpl: () => null,
    delete: null,
    exists: null,
    extendJSON: () => null,
    move: () => null,
    read: null,
    readJSON: () => null,
    write: null,
    writeJSON: () => null
};

const generatorStub: YeomanGenerator = <YeomanGenerator> {
    fs: fsStats,
    options: {},
    log: () => null,
    // composeWith: null,
    destinationPath: () => __dirname,
    destinationRoot: () => __dirname,
    // eslint-disable-next-line
    option: (name: string, config: YeomanGenerator.OptionConfig) => null,
    // eslint-disable-next-line
    prompt: (questions) => Promise.prototype,
    sourceRoot: () => __dirname,
    // desc: null,
    // help: null,
    // user: null,
    // eslint-disable-next-line
    spawnCommandSync: (command, args, opt) => null
};

const fsStatStub: fs.Stats = <fs.Stats>{
    isDirectory: () => null,
    isFile: () => null
};

const projectConfig: IProjectConfig = <IProjectConfig> {
    taskRunnerConfig: {}
};

const emptyProjectConfig = <IProjectConfig> {};

const firstInput: IProjectInput = <IProjectInput> {
    name: 'one',
    optionName: 'first',
    option: {
        type: String
    },
    prompt: {
        name: 'foo'
    },
    tryExtractInputValue: () => true
};

const secondInput: IProjectInput = <IProjectInput> {
    name: 'two',
    optionName: 'second',
    option: {
        type: Boolean
    },
    prompt: {
        name: 'bar'
    },
    tryExtractInputValue: () => true
};

const projectInputs = [ firstInput, secondInput ];

const firstScaffolder: IProjectScaffolder = <IProjectScaffolder>{
    scaffold: () => null
};

const secondScaffolder: IProjectScaffolder = <IProjectScaffolder>{
    scaffold: () => null
};

const projectScaffolders = [ firstScaffolder, secondScaffolder ];

const moduleNameErrMessageSuffix = 'Module name must follow the pattern of: host/owner/repo-path, like: ' +
'github.com/foo/bar or github.com/foo/bar/x/y/z';

const getModuleNameValidationErrorMessage = (input: string): string => {
    return `Invalid Go module name: '${input}'\n${moduleNameErrMessageSuffix}`;
};

const description = 'awesome go awesomeness';
const owner = 'swellaby';
const name = 'captain-githook';
const moduleName = `github.com/${owner}/${name}`;

const defaultPromptAnswers = {};
defaultPromptAnswers[descriptionInput.prompt.name] = description;
defaultPromptAnswers[linterInput.prompt.name] = Linter.golint;
defaultPromptAnswers[moduleInput.prompt.name] = moduleName;
defaultPromptAnswers[ownerInput.prompt.name] = owner;
defaultPromptAnswers[nameInput.prompt.name] = name;
defaultPromptAnswers[taskRunnerInput.prompt.name] = TaskRunner.task;
defaultPromptAnswers[typeInput.prompt.name] = ProjectType.boilerplate;
defaultPromptAnswers[vscodeInput.prompt.name] = true;

const defaultPromptAnswersCopy = () => JSON.parse(JSON.stringify(defaultPromptAnswers));

export = {
    expectedGreetingMessage,
    expectedErrorMessageBase,
    getExpectedErrorMessage,
    generatorStub,
    generatorFs: fsStats,
    generatorRoot,
    projectConfig,
    emptyProjectConfig,
    fsStatStub,
    firstInput,
    secondInput,
    projectInputs,
    projectScaffolders,
    firstScaffolder,
    secondScaffolder,
    wildcardGlobSuffix: '**/*',
    moduleNameErrMessageSuffix,
    getModuleNameValidationErrorMessage,
    fatalErrorMessage,
    defaultPromptAnswersCopy,
    defaultPromptAnswers
};
