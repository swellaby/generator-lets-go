'use strict';

import chai = require('chai');
import fs = require('fs');
import helpers = require('yeoman-test');
import path = require('path');
import Sinon = require('sinon');

import compTestUtils = require('../comp-test-utils');
import ProjectType = require('../../../generators/app/enums/project-type');

const assert = chai.assert;

suite('git Tests:', () => {
    let gitInitCommandStub: Sinon.SinonStub;
    let yoDestinationPathStub: Sinon.SinonStub;
    const baseAppName = 'baseOptionApp';
    const appType = ProjectType.lib;
    const appDescription = 'this is a test description';
    const author = 'hemingway';
    let prompts;
    const baseAppNameDir = compTestUtils.getCwdAppNameSubDirectoryPath(baseAppName);

    setup(() => {
        gitInitCommandStub = compTestUtils.createGitInitStub();
        yoDestinationPathStub = compTestUtils.createYoDestinationPathStub().callsFake(() => baseAppName);
        prompts = {
            name: baseAppName,
            description: appDescription,
            projectType: appType,
            vscode: true,
            author: author
        };
     });

    teardown(() => {
        Sinon.restore();
    });

    test('Should init a new git repository when the destination directory does not have a .git directory', async () => {
        await helpers.run(compTestUtils.generatorRoot).withPrompts(prompts).toPromise();
        assert.isTrue(gitInitCommandStub.called);
    });

    test('Should init a new git repository when the destination directory has a file named \'.git\'', async () => {
        // this stub is to ensure that the tmp directory (see below) creates the .git directory in
        // the same directory as the destinationRoot of the generator.
        yoDestinationPathStub.callsFake(() => baseAppNameDir);
        await helpers.run(compTestUtils.generatorRoot).inTmpDir((dir) => {
            fs.writeFileSync(path.join(dir, '.git'), null);
        }).withPrompts(prompts).toPromise();
        assert.isTrue(gitInitCommandStub.called);
    });

    test('Should not init a new git repository when the destination directory already has a git repo initialized', async () => {
        // this stub is to ensure that the tmp directory (see below) creates the .git directory in
        // the same directory as the destinationRoot of the generator.
        yoDestinationPathStub.callsFake(() => baseAppNameDir);
        await helpers.run(compTestUtils.generatorRoot).inTmpDir((dir) => {
            fs.mkdirSync(path.join(path.resolve(dir), '.git'));
        }).withPrompts(prompts).toPromise();
        assert.isFalse(gitInitCommandStub.called);
    });
});
