#!/usr/bin/env node

import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import axios from "axios";

const eksi = `
                        ,
                       / \\
                      (   )
                       "-"
 `

const sleep = () => new Promise((h) => setTimeout(h, 1000));
const api = "https://eksisozluk-api.herokuapp.com/api/debe/";
//unofficial eksi sozluk api'si/debe

async function header() {
    console.clear()
    await console.log(eksi)
    await figlet(`debe  in  cli`, (err, data) => {
        console.log(gradient.summer.multiline(data) + '\n');
    });
    await sleep();
};

async function decide()  {
    const inputs = await inquirer.prompt({
        name: "decide",
        type: "confirm",
        message: "başka bir debe daha istiyor musun acaba?\n",
        default: "false"
    })
    if (inputs.decide) {
        selectDebe()
    } else {
        process.exit(1)
    }
};

async function handleDebe(debe) {
    const checking = await createSpinner("debe derhal getiriliyor...\n").start();
    await sleep()
    axios.get(api)
        .then(res => {
            for (let i = 0; i < (res["data"].entries).length; i++) {
                if (res["data"].entries[i]["title"] === debe) {
                    let content = (res["data"].entries[i]["body"]).replace(/<br><br>/g, ' ')
                    let author = res["data"].entries[i]["author"]
                    checking.success({ text: `${content}\n\nyazar: ${author} ` })
                    decide()
                }
            }
        });
};

async function selectDebe() {
    let debeler = [];
    axios.get(api)
        .then(res => {
            for (let i = 0; i < (res["data"].entries).length; i++) {
                debeler.push(res["data"].entries[i]["title"]);
            }
        })
        .then(async() => {
            const inputs = await inquirer.prompt({
                name: "debes",
                type: "list",
                message: "debelerden bir debe seç...\n",
                choices: debeler,
            });
            return handleDebe(inputs.debes)
        })
};


//----------------
await header()
await selectDebe()