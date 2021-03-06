'use strict';

import chai = require('chai');
import descriptionInput = require('../../../generators/app/inputs/description-input');
import linterInput = require('../../../generators/app/inputs/linter-input');
import moduleInput = require('../../../generators/app/inputs/module-input');
import nameInput = require('../../../generators/app/inputs/name-input');
import ownerInput = require('../../../generators/app/inputs/owner-input');
import projectInputs = require('../../../generators/app/project-inputs');
import taskRunnerInput = require('../../../generators/app/inputs/task-runner-input');
import typeInput = require('../../../generators/app/inputs/type-input');
import vscodeInput = require('../../../generators/app/inputs/vscode-input');

const assert = chai.assert;

suite('projectInputs Tests:', () => {
    test('Should have correct number of inputs', () => {
        assert.deepEqual(projectInputs.length, 8);
    });

    test('Should have correct first input', () => {
        const input = projectInputs[0];
        assert.deepEqual(input, nameInput);
    });

    test('Should have correct second input', () => {
        const input = projectInputs[1];
        assert.deepEqual(input, descriptionInput);
    });

    test('Should have correct third input', () => {
        const input = projectInputs[2];
        assert.deepEqual(input, ownerInput);
    });

    test('Should have correct fourth input', () => {
        const input = projectInputs[3];
        assert.deepEqual(input, moduleInput);
    });

    test('Should have correct fifth input', () => {
        const input = projectInputs[4];
        assert.deepEqual(input, typeInput);
    });

    test('Should have correct sixth input', () => {
        const input = projectInputs[5];
        assert.deepEqual(input, linterInput);
    });

    test('Should have correct seventh input', () => {
        const input = projectInputs[6];
        assert.deepEqual(input, taskRunnerInput);
    });

    test('Should have correct eighth input', () => {
        const input = projectInputs[7];
        assert.deepEqual(input, vscodeInput);
    });
});
