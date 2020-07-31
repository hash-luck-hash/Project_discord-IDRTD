const config = require('./config.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const hand = require('./handler.js');
var defaultChannel;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!help',{type: "LISTENING"});
});
client.login(config.token);/////////LOGIN
var Arguments = new Array();
function Ping(arg, date, desc, ping_group) {
  this.arg = arg;
  this.date = date;
  this.desc = desc;
  this.ping_group = ping_group;
}
function compareNumbers(a, b) {
  return a.arg - b.arg
}
function fun_check(message,collector,msg){
  if(message.content.startsWith(config.prefix)) {msg.reply('During working function you CAN NOT start another one'); collector.stop();}
}
function normal_date(year, month, day, hour, minute){////////////do poprawy
  if(year<Math.floor(Date.now()/31556926000)+1970) return false;
  if(month<1||month>12) return false;
  if(month===1&&(day<1||day>31)) return false;
  else if(month==2){
    if(((Math.floor(Date.now()/31556926000)+1970)%4===0)&&(day<1||day>29)) return false;
    else if(day<1||day>28) return false; 
  }
  else if(month===3&&(day<1||day>31)) return false;
  else if(month===4&&(day<1||day>30)) return false;
  else if(month===5&&(day<1||day>31)) return false;
  else if(month===6&&(day<1||day>30)) return false;
  else if(month===7&&(day<1||day>31)) return false;
  else if(month===8&&(day<1||day>31)) return false;
  else if(month===9&&(day<1||day>30)) return false;
  else if(month===10&&(day<1||day>31)) return false;
  else if(month===11&&(day<1||day>30)) return false;
  else if(month===12&&(day<1||day>31)) return false;
  if(hour<0||hour>23) return false;
  if(minute<0||minute>59) return false;
  return true;
}
function check_out_event(Arguments_f){////////////////////defaultChannel
  if(Arguments_f.length===0) return;
  if(Arguments_f[0].arg<=Math.floor(Date.now()/1000)){
    const embed = new Discord.RichEmbed()
    .setTitle('Reminder')
    .setColor(Math.floor(Math.random() * 16777214) + 1)//randomcolor
    .addField('Date of event: ', Arguments_f[0].date)
    .addField('Description of event: ',Arguments_f[0].desc)
    .addField('It is important for: ',Arguments_f[0].ping_group);
    if(!defaultChannel) return;//jezeli nie prawidłowo podana
    defaultChannel.sendEmbed(embed);//sending mesages to default channel
    Arguments_f.shift();
  }
}
function Reminding(){
 // check_out_event();
    //client on which works all time
}
function help(message){
  const emb =  new Discord.RichEmbed()
  .setTitle('Command helper')
  .setColor(Math.floor(Math.random() * 16777214) + 1)
  .addField('!addevent addding event to calendar','<nothing else>')
  .addField('!defaultchannel adding channel where will be send all remind messages','<name of channel>')
  .addField('!calendar showing all events in calendar','<nothing else>')
  .addField('!test testing bot','<nothing else>');

  message.channel.sendEmbed(emb);
}
function test()
{
  var Arg_Test = new Array();

    Arg_Test.push(new Ping(200,'2020.12.14 15:09','Hello!','@admin'));
    Arg_Test.push(new Ping(50,'2017.12.14 15:09','Hello!','@admin'));
    Arg_Test.push(new Ping(100,'2019.12.14 15:09','Hello!','@admin'));
    Arguments.sort(compareNumbers);
    check_out_event(Arg_Test);  
}

function calendar(Arguments_f,message){///////////////////blad
  Arguments_f.length = 0;
  Arguments_f.push(new Ping(200,'2020.12.14 15:09','Hello!','@admin'));
  Arguments_f.push(new Ping(200,'2017.12.14 16:09','Hello!','ło co chodzi'));

  if(Arguments_f.length==0) { message.reply('Soon will be no events!'); return; }
    var em = new Discord.RichEmbed()
    .setTitle('That is your calender')
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setDescription('There is list of all events that will held soon');

    for(var i=0;i<Arguments_f.length;i++)
    {     
      em.addField('Description of event: ',Arguments_f[i].desc,
      'Date of event: ' + Arguments_f[i].date+' It is important for: ' + Arguments_f[i].ping_group);
    }
    defaultChannel.sendEmbed(em);
}

/////////////loooooooop////////////////
/*const loop = setInterval(function(){ 
  check_out_event(Arguments);
},500);*/

client.on('message', async message => {
   if(message.author.bot) return;
   if(!message.content.startsWith(config.prefix)) return; 

  if(message.content.startsWith('!defaultchannel'))////////////////////defaultchannel
  {
   let dc = message.content
        .trim()
        .split(/ +/g);
     defaultChannel = client.channels.find('name', dc[1]);
     if(defaultChannel) message.reply('Accpted channel!');
     else message.reply('There, on server are not any channels named "' + dc[1] + '"'); 

  } else if(message.content.startsWith('!addevent')){///////////////////////addevent
    if(!defaultChannel) {
      message.reply('Anyone has not set default channel yet'); 
      return;
    }
  
    message.reply("Date: [YYYY MM DD HH MM]");
        let args = "";
        let filter = m => !m.author.bot;
        let collector =  new Discord.MessageCollector(message.channel, filter);
        collector.on('collect', (msg, col) => { 
          //if(message.content.startsWith(config.prefix)) {msg.reply('During working function you CAN NOT start another one'); collector.stop();}
         // fun_check(message,collector,msg);  
          args = msg.content;
              args = args
              .trim()
              .split(/ +/g); 
              if(normal_date(args[0],args[1],args[2],args[3],args[4])){  
                    var data = Math.floor((new Date(args[0],args[1],args[2],args[3],args[4])-0)/1000);
                    var data_1 = data - 604800;
                    var data_2 = data - 259200;
                    var data_3 = data - 86400;
                    var data_4 = data - 3600;
                    var data_now = Math.floor((Date.now()-0)/1000);
                    message.reply("Set Description:(only one message)");
                    let tresc = "";
                    let filter = m => !m.author.bot;
                    let collector_2 =  new Discord.MessageCollector(message.channel, filter);
                    collector_2.on('collect', (msge, col) => {
                            tresc = msge.content;  
                            tresc = tresc
                          .trim()
                          //.split(/ +/g); 
                             
                                message.reply("Set PingGrup:(only one group <@group_name>)"); 
                                let filter = m => !m.author.bot;
                                let collector_3 =  new Discord.MessageCollector(message.channel, filter);
                                collector_3.on('collect', (msgef, col) => {
                                  console.log(msgef.content);
                                  //ARRAY INSERT PING
                                  if(data_now<data_1)
                                  Arguments.push(new Ping(data_1,args[0]+"."+args[1]+"."+args[2]+" "+args[3]+":"+args[4],tresc,msgef.contest));
                                  if(data_now<data_2)
                                  Arguments.push(new Ping(data_2,args[0]+"."+args[1]+"."+args[2]+" "+args[3]+":"+args[4],tresc,msgef.contest));
                                  if(data_now<data_3)
                                  Arguments.push(new Ping(data_3,args[0]+"."+args[1]+"."+args[2]+" "+args[3]+":"+args[4],tresc,msgef.contest));
                                  if(data_now<data_4)
                                  Arguments.push(new Ping(data_4,args[0]+"."+args[1]+"."+args[2]+" "+args[3]+":"+args[4],tresc,msgef.contest));
                                    Arguments.sort(compareNumbers);
                                    msgef.reply('Event was added!');
                                  collector_3.stop();
                            });
                        collector_2.stop();
                          });
                      collector.stop();
               }
              else
              msg.reply("unoptimal_date");
              //collector.stop();  
        });
  }
  else if(message.content.startsWith('!test'))////////////////test
  {
    if(!defaultChannel) {
      message.reply('Anyone has not set default channel yet'); 
      return;
    }
    test();///////////////////
  } else if(message.content.startsWith('!calendar')){
    if(!defaultChannel) {
      message.reply('Anyone has not set default channel yet'); 
      return;
    }
    calendar(Arguments,message);/////////////////////
  } 
  else if(message.content.startsWith('!help')){//////////////help
    help(message);////////////////////
  }
      else  message.reply('unoptimal_command');///////////////bad one
            
});
