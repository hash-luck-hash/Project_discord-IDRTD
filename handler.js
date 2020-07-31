function normal_date(year, month, day, hour, minute){
    if(year<Math.floor(Date.now()/31556926000)+1970) return false;
    if(month<1||month>12) return false;
    if(month==1&&(day<1||day>31)) return false;
    else if(month==2){
      if(((Math.floor(Date.now()/31556926000)+1970)%4==0)&&(day<1||day>29)) return false;
      else if(day<1||day>28) return false; 
    }
    else if(month==3&&(day<1||day>31)) return false;
    else if(month==4&&(day<1||day>30)) return false;
    else if(month==5&&(day<1||day>31)) return false;
    else if(month==6&&(day<1||day>30)) return false;
    else if(month==7&&(day<1||day>31)) return false;
    else if(month==8&&(day<1||day>31)) return false;
    else if(month==9&&(day<1||day>30)) return false;
    else if(month==10&&(day<1||day>31)) return false;
    else if(month==11&&(day<1||day>30)) return false;
    else if(month==12&&(day<1||day>31)) return false;
    if(hour<0||hour>23) return false;
    if(minute<0||minute>59) return false;
    return true;
  }
  function check_out_event(){
    if(Arguments.length==0) return;
    if(Arguments[0].arg<=Math.floor(Date.now()/1000)){
      const embed = new Discord.RichEmbed()
      .setTitle('Reminder')
      .setColor(Math.floor(Math.random() * 16777214) + 1)//randomcolor
      .addField('Date of event: ', Arguments[0].date)
      .addField('Description of event: ',Arguments[0].desc)
      .addField('It is important for: ',Arguments[0].ping_group);
      if(!defaultChannel) return;//jezeli nie prawidłowo podana
      defaultChannel.sendEmbed(embed);//sending mesages to default channel
      Arguments.shift();
    }
  }
  function Reminding(){
      check_out_event();
    //client on which works all time
}
function help(message){
    const emb =  new Discord.RichEmbed()
    .setTitle('Command helper')
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .addField('!addevent','addding event to calendar')
    .addField('!defaueltchannel','adding channel where will be send all remind messages');
  
    message.channel.sendEmbed(emb);
  }

  module.exports.normal_date=normal_date;
  module.exports.check_out_event=check_out_event;
  module.exports.Reminding=Reminding;
  module.exports.help=help;
