'use strict';

import YeomanGenerator = require('yeoman-generator');
import yosay = require('yosay');

import IProjectConfig = require('./project-config');
import projectConfigUtils = require('./inputs/project-config-utils');
import projectSettings = require('./settings/settings');

class LetsGoGenerator {
    private config: IProjectConfig;
    private generator: YeomanGenerator;

    constructor(generator: YeomanGenerator) {
        this.generator = generator;
    }

    public async createProject(): Promise<void> {
        this.generator.log(yosay('Welcome to the LetsGo Generator!'));

        try {
            this.config = await projectConfigUtils.getDesiredProjectConfig(this.generator, projectSettings);
        } catch (err) {
            let errMsg = 'Encountered an unexpected error while creating your ' +
            'new project. Please try again.';
            if (err && err.message) {
                errMsg += ` Error details: '${err.message}'`;
            }
            this.generator.log(errMsg);
        }
    }

}

export = LetsGoGenerator;