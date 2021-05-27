/*
 * @Descripttion: 
 * @version: 
 * @Author: gonghairun
 * @Date: 2020-07-01 10:14:24
 * @LastEditors: gonghairun
 * @LastEditTime: 2020-07-01 18:17:39
 */ 
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const server = require('./products');
const spinner = ora('正在发布到' + server.name + '服务器...\n');
const spinnerCopy = ora('正在备份到' + server.name + '服务器...\n');
const ssh2 = new (require('ssh2').Client)(); // 版本新增
const compressing = require('compressing');

// 生成zip压缩包的名字（根据自己的需要自定义）
const filePath = "./" + (new Date()).getTime() + server.assetsRoot.replace('./', '')  + ".zip";

ssh2.on('ready', () => {
    console.log(chalk.green('连接服务成功...'));
    ssh2.exec("rm -rf " + server.path + '/'+server.assetsRoot, (err,stream)=> {
        console.log(chalk.green('正在删除缓存历史文件...\n'));
        if (err) {console.log(chalk.red('删除失败.\n')); throw err;}
        stream.on("close", ()=>{
            ssh2.end();
            uploadFile();
            backups();
        });
    });
}).connect({
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password,
    path: server.path
});
// upload you file
function uploadFile() {
    spinner.start();
    scpClient.scp(
        server.assetsRoot,
        {
            host: server.host,
            port: server.port,
            username: server.username,
            password: server.password,
            path: server.path+'/'+server.assetsRoot.replace('./', '')
        },
        function (err) {
            spinner.stop();
            if (err) {
                console.log(chalk.red('发布失败.\n'));
                throw err;
            } else {
                console.log(chalk.green('Success! 成功发布到' + server.name + '服务器! \n'));
            }
        }
    );
}


/**
 * copy you file to server
 */
    function backups() {
    spinnerCopy.start();
    console.log(chalk.green('\n正在生成压缩文件，请稍等! \n'));

    compressing.zip
    .compressDir(server.assetsRoot, filePath)
    .then(() => {

        scpClient.scp(
        filePath,
        {
            host: server.host,
            port: server.port,
            username: server.username,
            password: server.password,
            path: server.path
        },
        function (err) {
            spinnerCopy.stop();
            if (err) {
                console.log(chalk.red('备份失败.\n'));
                throw err;
            } else {
                console.log(chalk.green('Success! 成功备份到' + server.name + '服务器! \n'));
            }
        });
    }).catch(err => {
        console.error(err);
        spinnerCopy.stop();
        console.log(chalk.red('备份失败.\n'));
        throw err;
    });
    return 'Success';
}

// const scpClient = require('scp2');
// const ora = require('ora');
// const chalk = require('chalk');
// const server = require('./products');
// const spinner = ora('正在发布到' + (process.env.NODE_ENV === 'prd' ? '生产' : '测试') + '服务器...');
// spinner.start();
// scpClient.scp(
//     server.assetsRoot,
//     {
//         host: server.host,
//         port: server.port,
//         username: server.username,
//         password: server.password,
//         path: server.path
//     },
//     function (err) {
//         spinner.stop();
//         if (err) {
//         console.log(chalk.red('发布失败.\n'));
//         throw err;
//         } else {
//         console.log(chalk.green('Success! 成功发布到' + (process.env.NODE_ENV === 'prd' ? '生产' : '测试') + '服务器! \n'));
//         }
//     }
// );