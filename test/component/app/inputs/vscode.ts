'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import YeomanGenerator = require('yeoman-generator');

import projectInputUtils = require('../../../../generators/app/project-input-utils');
import scaffoldEngine = require('../../../../generators/app/scaffold-engine');

import vsCodeInput = require('../../../../generators/app/inputs/vscode-input');
import testUtils = require('../../../test-utils');

const assert = Chai.assert;

suite('vscode input Tests:', () => {
    let generatorStub: YeomanGenerator;
    let generatorPromptStub: Sinon.SinonStub;
    let answers;
    const input = vsCodeInput;
    const inputs = [ input ];
    const optionName = input.optionName;
    const prompt = input.prompt;
    const promptName = prompt.name;
    const expVal = true;

    setup(() => {
        answers = {};
        generatorStub = testUtils.generatorStub;
        Sinon.stub(generatorStub, 'log');
        generatorPromptStub = Sinon.stub(generatorStub, 'prompt').callsFake(() => Promise.resolve(answers));
        Sinon.stub(scaffoldEngine, 'scaffoldNewProject');
    });

    teardown(() => {
        Sinon.restore();
        generatorStub = null;
        answers = null;
    });

    test('Should prompt when option is invalid ', async () => {
        generatorStub.options[optionName] = undefined;
        answers[promptName] = expVal;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.deepEqual(config.includeVSCode, expVal);
    });

    test('Should not prompt when option is valid ', async () => {
        generatorStub.options[optionName] = expVal;
        const config = await projectInputUtils.getDesiredProjectConfig(generatorStub, inputs);
        assert.isFalse(generatorPromptStub.called);
        assert.deepEqual(config.includeVSCode, expVal);
    });
});
