const { Command } = require('@oclif/command');
const chalk = require('chalk');
const CONSTANTS = require('../utils/constants');
const Storage = require('../utils/storage');

class DoneCommand extends Command {
  async run() {
    const { args } = this.parse(DoneCommand);
    const storage = Storage.getInstance(this.config);

    const data = await storage.read();

    if (args.INDEX) {
      const item = data.todo[args.INDEX - 1];
      if (item) {
        data.todo.splice(args.INDEX - 1, 1);
        data.done.push(item);
        storage.write(data);
      } else {
        this.log(chalk.yellow(CONSTANTS.DONE_INCORRECT_INDEX(args.INDEX)));
      }
    }
  }
}

DoneCommand.description = `✅\tMark as done a pending item
...
Example: todo done 1
`;

DoneCommand.args = [
  {
    name: 'INDEX',
    description: 'Todo item identifier',
    require: true,
  },
];

module.exports = DoneCommand;
