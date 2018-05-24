<?php

namespace Deployer;

require 'recipe/common.php';

(new \Dotenv\Dotenv(__DIR__))->load();

// Project name
set('application', 'deoliveiralucas.net');

// Project repository
set('repository', 'git@github.com:deoliveiralucas/deoliveiralucas.github.io.git');

// Shared files/dirs between deploys
set('shared_files', ['.env']);
set('shared_dirs', ['data/cache']);

// Writable dirs by web server 
set('writable_dirs', []);

set('bin/php', function () {
    return '/opt/php71/bin/php';
});

// Hosts
host(getenv('SSH_DEPLOY_HOST'))
    ->user(getenv('SSH_DEPLOY_USER'))
    ->port(getenv('SSH_DEPLOY_PORT'))
    ->set('deploy_path', getenv('SSH_DEPLOY_PATH'));
    
// Tasks
desc('Deploy deoliveiralucas.net');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:vendors',
    'deploy:clear_paths',
    'deploy:symlink',
    'deploy:unlock',
    'cleanup',
    'success'
]);

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
