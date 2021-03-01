/*！
 * @file pxt-microIoT/microIoT.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](等网址)
 * @n micro:bit IoT Kit is a set of modules designed to incorporate IoT in education, supporting multiple popular IoT platforms like easyIoT, Thingspeak, and IFTTT. 
 * It includes 14 external sensors and 15 application tutorials.  
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	MIT Lesser General Public License
 *
 * @author [email](jie.tang@dfrobot.com)
 * @date  2019-12-31
 */

const OBLOQ_MQTT_EASY_IOT_SERVER_CHINA = "iot.dfrobot.com.cn"
const OBLOQ_MQTT_EASY_IOT_SERVER_GLOBAL = "mqtt.beebotte.com"
const OBLOQ_MQTT_EASY_IOT_SERVER_EN = "iot.dfrobot.com"
const microIoT_WEBHOOKS_URL = "maker.ifttt.com"
const OBLOQ_MQTT_EASY_IOT_SERVER_TK = "api.thingspeak.com"

enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

enum PIN {
    P0 = 3,
    P1 = 2,
    P2 = 1,
    P8 = 18,
    P12 = 20,
    P13 = 23,
    P14 = 22,
    P16 = 16,
}

enum PIN_1 {
    P0 = 3,
    P1 = 2,
    P2 = 1,
}
//DT11
enum DT11 {
    //% block="temperature(℃)"
    temperature_C = 1,
    //% block="temperature(℉)"
    temperature_F = 2,
    //% block="humidity(%)"
    humidity = 3
}

enum Switch {
    //% block="turn ON"
    ON = 1,
    //% block="turn OFF"
    OFF = 0
}

enum CCS{
    //% block="CO2"
    CO2 = 1,
    //% block="TVOC"
    TVOC = 2
}
enum Time{
    //% block="year"
    year,
    //% block="month"
    month,
    //% block="day"
    day,
    //% block="hour"
    hour,
    //% block="minute"
    minute,
    //% block="second"
    second,
}
//color=#6699CC
//% weight=10 color=#378CE1 icon="\uf1eb" block="IoT Cloud Kit"
//% groups=['IoT', 'Sensor', 'OLED', 'Motor', 'RGB', 'Servo', 'others','Time']
namespace microIoT {
    let IIC_ADDRESS = 0x16;
    let IIC_ADDRESS1 = 0x10;
    let CCS811_I2C_ADDRESS1 = 0x5A;

    let Topic0CallBack: Action = null;
    let Topic1CallBack: Action = null;
    let Topic2CallBack: Action = null;
    let Topic3CallBack: Action = null;
    let Topic4CallBack: Action = null;
    let Wifi_Status = 0x00

    let microIoT_WEBHOOKS_KEY = ""
    let microIoT_WEBHOOKS_EVENT = ""
    let microIoT_THINGSPEAK_KEY = ""
    let microIoT_BEEBOTTE_Token = ""

    let READmode = 0x00
    let Wifimode = 0x00
    let SET_PARA = 0x01
    let RUN_COMMAND = 0x02
    let HTTP_Mode = 0x00

    /*set para*/
    let SETWIFI_NAME = 0x01
    let SETWIFI_PASSWORLD = 0x02
    let SETMQTT_SERVER = 0x03
    let SETMQTT_PORT = 0x04
    let SETMQTT_ID = 0x05
    let SETMQTT_PASSWORLD = 0x06
    let SETHTTP_IP = 0x07
    let SETHTTP_PORT = 0x08

    /*run command*/
    let SEND_PING = 0x01
    let CONNECT_WIFI = 0x02
    let RECONNECT_WIFI = 0x03
    let DISCONECT_WIFI = 0x04
    let CONNECT_MQTT = 0x05
    let SUB_TOPIC0 = 0x06
    let SUB_TOPIC1 = 0x07
    let SUB_TOPIC2 = 0x08
    let SUB_TOPIC3 = 0x09
    let SUB_TOPIC4 = 0x0A
    let PUB_TOPIC0 = 0x0B
    let PUB_TOPIC1 = 0x0C
    let PUB_TOPIC2 = 0x0D
    let PUB_TOPIC3 = 0x0E
    let PUB_TOPIC4 = 0x0F
    let GET_URL = 0x10
    let POST_URL = 0x11
    let PUT_URL = 0x12
    let GET_VERSION = 0x13


    /*read para value*/
    let READ_PING = 0x01
    let READ_WIFISTATUS = 0x02
    let READ_IP = 0x03
    let READ_MQTTSTATUS = 0x04
    let READ_SUBSTATUS = 0x05
    let READ_TOPICDATA = 0x06
    let HTTP_REQUEST = 0x10
    let READ_VERSION = 0x12

    /*para status */
    let PING_OK = 0x01
    let WIFI_DISCONNECT = 0x00
    let WIFI_CONNECTING = 0x02
    let WIFI_CONNECTED = 0x03
    let MQTT_CONNECTED = 0x01
    let MQTT_CONNECTERR = 0x02
    let SUB_TOPIC_OK = 0x01
    let SUB_TOPIC_Ceiling = 0x02


    let microIoTStatus = ""
    let WIFI_NAME = ""
    let WIFI_PASSWORLD = ""
    let MQTT_SERVER = ""
    let MQTT_PORT = ""
    let MQTT_ID = ""
    let MQTT_PASSWORLD = ""
    let Topic_0 = ""
    let Topic_1 = ""
    let Topic_2 = ""
    let Topic_3 = ""
    let Topic_4 = ""
    let RECDATA = ""
    let HTTP_IP = ""
    let HTTP_PORT = ""
    let microIoT_IP = "0.0.0.0"
    let G_city = 0;

    export enum aMotors {
        //% blockId="M1" block="M1"
        M1 = 0,
        //% blockId="M2" block="M2"
        M2 = 1,
        //% blockId="ALL" block="ALL"
        ALL = 2
    }

    export enum aServos {
        //% blockId="S1" block="S1"
        S1 = 0,
        //% blockId="S2" block="S2"
        S2 = 1
    }

    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 0x0,
        //% blockId="CCW" block="CCW"
        CCW = 0x1
    }

    export enum SERVERS {
        //% blockId=SERVERS_China block="EasyIoT_CN"
        China,
        //% blockId=SERVERS_English block="EasyI0T_EN"
        English
        
    }

    export enum TOPIC {
        topic_0 = 0,
        topic_1 = 1,
        topic_2 = 2,
        topic_3 = 3,
        topic_4 = 4
    }

    export class PacketMqtt {
        public message: string;
    }
    /**
     * init I2C
     */
    //% block=" I2C init"
    export function i2cinit():void{
        init();
    }

    /**
     * Set the microIoT servos.
     */

    //% weight=50
    //% group="Servo"
    //% blockId=microIoT_ServoRun block="servo|%index|angle|%angle"
    //% angle.min=0 angle.max=180
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function microIoT_ServoRun(index: aServos, angle: number): void {
        let buf = pins.createBuffer(2);
        if (index == 0) {
            buf[0] = 0x14;
        }
        if (index == 1) {
            buf[0] = 0x15;
        }
        buf[1] = angle;
        pins.i2cWriteBuffer(IIC_ADDRESS1, buf);
    }

    /**
     * Set the microIoT motor 
     */

    //% weight=49
    //% group="Motor"
    //% blockId=microIoT_MotorRun block="motor dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function microIoT_MotorRun(direction: Dir, speed: number): void {
        let buf = pins.createBuffer(3);
            buf[0] = 0x00;
            if (direction == 0x00) {
                buf[1] = 0x01;
            } else {
                buf[1] = 0x00;
            }
        buf[2] = speed;
        pins.i2cWriteBuffer(IIC_ADDRESS1, buf);
    }

    /**
     * Set the motor stop
     */

    //% weight=48
    //% group="Motor"
    //% blockId=microIoT_motorStop block="motor stop"
    //% motors.fieldEditor="gridpicker" motors.fieldOptions.columns=2 
    export function microIoT_motorStop(): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x00;
        buf[1] = 0;
        buf[2] = 0;
        pins.i2cWriteBuffer(IIC_ADDRESS1, buf);
    }


    function microIoT_setPara(cmd: number, para: string): void {
        let buf = pins.createBuffer(para.length + 4);
        buf[0] = 0x1E
        buf[1] = SET_PARA
        buf[2] = cmd
        buf[3] = para.length
        for (let i = 0; i < para.length; i++)
            buf[i + 4] = para[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function microIoT_runCommand(cmd: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
    }

    function microIoT_readStatus(para: number): number {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        return recbuf[1]
    }

    function microIoT_readValue(para: number): string {
        let buf = pins.createBuffer(3);
        let paraValue = 0x00
        let tempLen = 0x00
        let dataValue = ""
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = para
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        microIoT_CheckStatus("READ_IP");
        return RECDATA
    }

    function microIoT_ParaRunCommand(cmd: number, data: string): void {
        let buf = pins.createBuffer(data.length + 4)
        buf[0] = 0x1E
        buf[1] = RUN_COMMAND
        buf[2] = cmd
        buf[3] = data.length
        for (let i = 0; i < data.length; i++)
            buf[i + 4] = data[i].charCodeAt(0)
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);

    }

    function microIoT_CheckStatus(cmd: string): void {
        while (true) {
            if (microIoTStatus == cmd) {
                serial.writeString("OKOK\r\n");
                return;
            }
            basic.pause(50);
        }
    }
     //% advanced=true shim=i2c::init
    function init(): void {
        return;
    }

    /**
    * WiFi configuration
    * @param SSID to SSID ,eg: "yourSSID"
    * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
    */

    //% weight=100
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_WIFI_Setup block="Wi-Fi configure name: %SSID| password：%PASSWORD start connection"
    export function WIFISetup(SSID: string, PASSWORD: string): void {
        init();
        microIoT_setPara(SETWIFI_NAME, SSID)
        microIoT_setPara(SETWIFI_PASSWORLD, PASSWORD)
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifimode = WIFI_CONNECTED
    }

    /**
     * MQTT configuration
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_ID to IOT_ID ,eg: "yourIotId"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_TOPIC to IOT_TOPIC ,eg: "yourIotTopic"
     * @param IP to IP ,eg: "192.168."
    */

    //% weight=90
    //% group="IoT"
    //% blockExternalInputs=1
    //% blockId=WiFi_IoT_I2C_MQTT block="MQTT configure|IoT_ID(user):%IOT_ID|IoT_PWD(password):%IOT_PWD|Topic(default topic_0):%IOT_TOPIC|server:%SERVERS||IP:%IP"
    export function mqttSetup(
        IOT_ID: string, IOT_PWD: string,
        IOT_TOPIC: string,servers: SERVERS, IP?: string):
        void {
        if (servers == SERVERS.China) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_CHINA)
        } else if (servers == SERVERS.English) {
            microIoT_setPara(SETMQTT_SERVER, OBLOQ_MQTT_EASY_IOT_SERVER_EN)
        }else{microIoT_setPara(SETMQTT_SERVER, IP)}
        microIoT_setPara(SETMQTT_PORT, "1883")//1883
        microIoT_setPara(SETMQTT_ID, IOT_ID)
        microIoT_setPara(SETMQTT_PASSWORLD, IOT_PWD)
        serial.writeString("wifi conneced ok\r\n");
        microIoT_runCommand(CONNECT_MQTT);
        microIoT_CheckStatus("MQTTConnected");
        serial.writeString("mqtt connected\r\n");
      
        Topic_0 = IOT_TOPIC
        microIoT_ParaRunCommand(SUB_TOPIC0, IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");
        serial.writeString("sub topic ok\r\n");

    }

    /**
     * Add an MQTT subscription
     * @param IOT_TOPIC ,eg: "yourIotTopic"
     */

    //% weight=70
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_add_topic
    //% block="subscribe additional %top |: %IOT_TOPIC"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function mqttAddTopic(top: TOPIC, IOT_TOPIC: string): void {
        microIoT_ParaRunCommand((top + 0x06), IOT_TOPIC);
        microIoT_CheckStatus("SubTopicOK");

    }

    /**
     * MQTT sends information to the corresponding subscription
     * @param Mess to Mess ,eg: "mess"
     */

    //% weight=80
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_SendMessage block="send message %Mess| to |%TOPIC"
    export function mqttSendMessageMore(Mess: string, Topic: TOPIC): void {
        let topic = 0

        switch (Topic) {
            case TOPIC.topic_0:
                topic = PUB_TOPIC0
                break;
            case TOPIC.topic_1:
                topic = PUB_TOPIC1
                break;
            case TOPIC.topic_2:
                topic = PUB_TOPIC2
                break;
            case TOPIC.topic_3:
                topic = PUB_TOPIC3
                break;
            case TOPIC.topic_4:
                topic = PUB_TOPIC4
                break;
            default:
                break;

        }
        microIoT_ParaRunCommand(topic, Mess)

    }

    function microIoT_callback(top: TOPIC, a: Action): void {
        switch (top) {
            case TOPIC.topic_0:
                Topic0CallBack = a;
                break;
            case TOPIC.topic_1:
                Topic1CallBack = a;
                break;
            case TOPIC.topic_2:
                Topic2CallBack = a;
                break;
            case TOPIC.topic_3:
                Topic3CallBack = a;
                break;
            case TOPIC.topic_4:
                Topic4CallBack = a;
                break;
            default:
                break;
        }
    }

    /**
     * MQTT processes the subscription when receiving message
     */

    //% weight=60
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_MQTT_Event block="on %top received"
    //% top.fieldEditor="gridpicker" top.fieldOptions.columns=2
    export function mqttCallbackUserMore(top: TOPIC, cb: (message: string) => void) {
        microIoT_callback(top, () => {
            const packet = new PacketMqtt()
            packet.message = RECDATA
            cb(packet.message)
        });
    }

    /**
    * IFTTT configuration
    * @param EVENT to EVENT ,eg: "yourEvent"
    * @param KEY to KEY ,eg: "yourKey"
    */

    //% weight=26
    //% group="IoT"
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_I2C_IFTTT_Configure
    //% block="IFTTT configure|event: %EVENT|key: %KEY"
    export function IFTTTConfigure(EVENT: string, KEY: string): void {
        microIoT_WEBHOOKS_EVENT = EVENT
        microIoT_WEBHOOKS_KEY = KEY
    }
    
    function microIoT_http_wait_request(time: number): string {
        if (time < 100) {
            time = 100
        }
        let timwout = time / 100
        let _timeout = 0
        while (true) {
            basic.pause(100)
            if (microIoTStatus == "HTTP_REQUEST") {
                microIoTStatus = "";
                return RECDATA
            } else if (microIoTStatus == "HTTP_REQUESTFailed") {
                microIoTStatus = "";
                return "requestFailed"
            }
            _timeout += 1
            if (_timeout > timwout) {
                return "timeOut"
            }
        }
    }
    
    /**
     * ThingSpeak configuration
     * @param KEY to KEY ,eg: "your Key"
     */
    
    //% weight=28
    //% group="IoT"
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_I2C_ThingSpeak_configura
    //% block="ThingSpeak configure key: %KEY"
    export function ThingSpeakConfigure(KEY: string): void {
        microIoT_THINGSPEAK_KEY = KEY
    }

    /**
    * ThingSpeak configured and sent data
    * @param field1 ,eg: 2020
    */

    //% weight=27
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_ThingSpeak_Configure
    //% expandableArgumentMode="enabled"
    //% inlineInputMode=inline
    //% block="ThingSpeak send value1: %field1||value2: %field2|value3: %field3|value4: %field4|value5: %field5|value6: %field6|value7: %field7 value8: %field8" 
    export function ThingSpeakSend(field1: string, field2?: string, field3?: string, field4?: string, field5?: string, field6?: string, field7?: string, field8?: string): void {
        microIoT_setPara(SETHTTP_IP, OBLOQ_MQTT_EASY_IOT_SERVER_TK)
        let tempStr = ""
        tempStr = "update?api_key=" + microIoT_THINGSPEAK_KEY + "&field1=" + field1 
         if(field2 != undefined){
            tempStr += "&field2=" + field2
        }else if(field3 != undefined){
            tempStr += "&field3=" + field3
        }else if(field4 != undefined){
            tempStr += "&field4=" + field4
        }else if(field5 != undefined){
            tempStr += "&field5=" + field5
        }else if(field6 != undefined){
            tempStr += "&field6=" + field6
        }else if(field7 != undefined){
            tempStr += "&field7=" + field7
        }else if(field8 != undefined){
            tempStr += "&field8=" + field8
        }else{
            tempStr += "\r"
        }
        microIoT_ParaRunCommand(GET_URL, tempStr);
    }

    /**
     * IFTTT send data
     * time(ms): private long maxWait
     * @param value1 ,eg: Hi
     * @param value2 ,eg: DFRobot
     * @param value3 ,eg: 2020
    */

    //% weight=25
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_IFTTT_Send
    //% block="IFTTT send value1:%value1|value2:%value2|value3:%value3"
    //% inlineInputMode=inline
    export function IFTTTSend(value1: string, value2: string, value3: string): void {
        microIoT_setPara(SETHTTP_IP, microIoT_WEBHOOKS_URL)
        let tempStr = ""
        tempStr = "trigger/" + microIoT_WEBHOOKS_EVENT + "/with/key/" + microIoT_WEBHOOKS_KEY + ",{\"value1\":\"" + value1 + "\",\"value2\":\"" + value2 + "\",\"value3\":\"" + value3 + "\" }" + "\r"
        microIoT_ParaRunCommand(POST_URL, tempStr)
    }


    /**
     * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param IP to IP ,eg: "0.0.0.0"
     * @param PORT to PORT ,eg: 80
    */
	
    //% weight=24
    //% group="IoT"
    //% receive.fieldEditor="gridpicker" receive.fieldOptions.columns=3
    //% send.fieldEditor="gridpicker" send.fieldOptions.columns=3
    //% blockId=WiFi_IoT_UART_http_setup
    //% block="configure http ip: %IP port: %PORT  start connection"
    export function httpSetup(IP: string, PORT: number):void {
        microIoT_setPara(SETHTTP_IP, IP)
        microIoT_setPara(SETHTTP_PORT, PORT.toString())
        microIoT_runCommand(CONNECT_WIFI)
        microIoT_CheckStatus("WiFiConnected");
        Wifi_Status = WIFI_CONNECTED
    }
    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
	
    //% weight=23
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_http_get
    //% block="http(get) | url %url| timeout(ms) %time"
    export function httpGet(url: string, time: number): string {
        microIoT_ParaRunCommand(GET_URL, url)
        return microIoT_http_wait_request(time);
    }


    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=22
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_http_post
    //% block="http(post) | url %url| content %content| timeout(ms) %time"
    export function httpPost(url: string, content: string, time: number): string {
        let tempStr = ""
        tempStr = url + "," + content;
        microIoT_ParaRunCommand(POST_URL, tempStr)
        return microIoT_http_wait_request(time);
    }

     /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
	
    //% weight=21
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_http_put
    //% block="http(put) | url %url| content %content| timeout(ms) %time"
    export function httpPut(url: string, content: string, time: number): string {
        let tempStr = ""
        tempStr = url + "," + content;
        microIoT_ParaRunCommand(PUT_URL, tempStr)
        return microIoT_http_wait_request(time);
    }
	
    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */

    //% weight=20
    //% group="IoT"
    //% blockId=WiFi_IoT_I2C_get_version
    //% block="get version"
    export function getVersion(): string {
        let buf = pins.createBuffer(3);
        buf[0] = 0x1E;
        buf[1] = RUN_COMMAND;
        buf[2] = GET_VERSION;
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        microIoT_CheckStatus("READ_VERSION");
        return RECDATA
    }

    function microIoT_GetData(len: number): void {
        RECDATA = ""
        let tempbuf = pins.createBuffer(1)
        tempbuf[0] = 0x22
        pins.i2cWriteBuffer(IIC_ADDRESS, tempbuf);
        let tempRecbuf = pins.createBuffer(len)
        tempRecbuf = pins.i2cReadBuffer(IIC_ADDRESS, len, false)
        for (let i = 0; i < len; i++) {
            RECDATA += String.fromCharCode(tempRecbuf[i])
        }
    }

    function microIoT_InquireStatus(): void {
        let buf = pins.createBuffer(3)
        let tempId = 0
        let tempStatus = 0
        buf[0] = 0x1E
        buf[1] = READmode
        buf[2] = 0x06
        pins.i2cWriteBuffer(IIC_ADDRESS, buf);
        let recbuf = pins.createBuffer(2)
        recbuf = pins.i2cReadBuffer(IIC_ADDRESS, 2, false)
        tempId = recbuf[0]
        tempStatus = recbuf[1]
        switch (tempId) {
            case READ_PING:
                if (tempStatus == PING_OK) {
                    microIoTStatus = "PingOK"
                } else {
                    microIoTStatus = "PingERR"
                }
                break;
            case READ_WIFISTATUS:
                if (tempStatus == WIFI_CONNECTING) {
                    microIoTStatus = "WiFiConnecting"
                } else if (tempStatus == WIFI_CONNECTED) {
                    microIoTStatus = "WiFiConnected"
                } else if (tempStatus == WIFI_DISCONNECT) {
                    microIoTStatus = "WiFiDisconnect"
                } else {
                }
                break;
            case READ_MQTTSTATUS:
                if (tempStatus == MQTT_CONNECTED) {
                    microIoTStatus = "MQTTConnected"
                } else if (tempStatus == MQTT_CONNECTERR) {
                    microIoTStatus = "MQTTConnectERR"
                }
                break;
            case READ_SUBSTATUS:
                if (tempStatus == SUB_TOPIC_OK) {
                    microIoTStatus = "SubTopicOK"
                } else if (tempStatus == SUB_TOPIC_Ceiling) {
                    microIoTStatus = "SubTopicCeiling"
                } else {
                    microIoTStatus = "SubTopicERR"
                }
                break;
            case READ_IP:
                microIoTStatus = "READ_IP"
                microIoT_GetData(tempStatus)
                microIoT_IP = RECDATA
                break;
            case SUB_TOPIC0:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic0CallBack != null) {
                    Topic0CallBack();
                }
                break;
            case SUB_TOPIC1:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic1CallBack != null) {
                    Topic1CallBack();
                }
                break;
            case SUB_TOPIC2:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic2CallBack != null) {
                    Topic2CallBack();
                }
                break;
            case SUB_TOPIC3:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic3CallBack != null) {
                    Topic3CallBack();
                }
                break;
            case SUB_TOPIC4:
                microIoTStatus = "READ_TOPICDATA"
                microIoT_GetData(tempStatus)
                if (Topic4CallBack != null) {
                    Topic4CallBack();
                }
                break;
            case HTTP_REQUEST:
                microIoTStatus = "HTTP_REQUEST"
                microIoT_GetData(tempStatus)
                break;
            case READ_VERSION:
                microIoTStatus = "READ_VERSION"
                microIoT_GetData(tempStatus)
                break;
            default:
                break;
        }
        basic.pause(200);
    }
    basic.forever(function () {
        microIoT_InquireStatus();
    })

     /**
    * Initialize OLED, just put the module in the module at the beginning of the code, no need to reuse
    */

    //% weight=200
    //% group="OLED"
    //% block="init display"
    export function microIoT_initDisplay(): void {
        init();
        microIoT_cmd(0xAE);  // Set display OFF
        microIoT_cmd(0xD5);  // Set Display Clock Divide Ratio / OSC Frequency 0xD4
        microIoT_cmd(0x80);  // Display Clock Divide Ratio / OSC Frequency 
        microIoT_cmd(0xA8);  // Set Multiplex Ratio
        microIoT_cmd(0x3F);  // Multiplex Ratio for 128x64 (64-1)
        microIoT_cmd(0xD3);  // Set Display Offset
        microIoT_cmd(0x00);  // Display Offset
        microIoT_cmd(0x40);  // Set Display Start Line
        microIoT_cmd(0x8D);  // Set Charge Pump
        microIoT_cmd(0x14);  // Charge Pump (0x10 External, 0x14 Internal DC/DC)
        microIoT_cmd(0xA1);  // Set Segment Re-Map
        microIoT_cmd(0xC8);  // Set Com Output Scan Direction
        microIoT_cmd(0xDA);  // Set COM Hardware Configuration
        microIoT_cmd(0x12);  // COM Hardware Configuration
        microIoT_cmd(0x81);  // Set Contrast
        microIoT_cmd(0xCF);  // Contrast
        microIoT_cmd(0xD9);  // Set Pre-Charge Period
        microIoT_cmd(0xF1);  // Set Pre-Charge Period (0x22 External, 0xF1 Internal)
        microIoT_cmd(0xDB);  // Set VCOMH Deselect Level
        microIoT_cmd(0x40);  // VCOMH Deselect Level
        microIoT_cmd(0xA4);  // Set all pixels OFF
        microIoT_cmd(0xA6);  // Set display not inverted
        microIoT_cmd(0xAF);  // Set display On
        microIoT_clear();
    }
    /**
     * OLED clear
     */
    //% weight=60
    //% group="OLED"
    //% block="clear OLED"
    export function microIoT_clear() {
        for (let j = 0; j < 8; j++) {
            microIoT_setText(j, 0);
            {
                for (let i = 0; i < 16; i++)  //clear all columns
                {
                    microIoT_putChar(' ');
                }
            }
        }
        microIoT_setText(0, 0);
    }

    function microIoT_setText(row: number, column: number) {
        let r = row;
        let c = column;
        if (row < 0) { r = 0 }
        if (column < 0) { c = 0 }
        if (row > 7) { r = 7 }
        if (column > 15) { c = 15 }

        microIoT_cmd(0xB0 + r);            //set page address
        microIoT_cmd(0x00 + (8 * c & 0x0F));  //set column lower address
        microIoT_cmd(0x10 + ((8 * c >> 4) & 0x0F));   //set column higher address
    }

    function microIoT_putChar(c: string) {
        let c1 = c.charCodeAt(0);
        microIoT_writeCustomChar(basicFont[c1 - 32]);
    }
    /**
     * @param line line num (8 pixels per line), eg: 0
     * @param text value , eg: DFRobot
     * OLED  display string
     */
    //% weight=60
    //% group="OLED"
    //% text.defl="DFRobot"
    //% line.min=0 line.max=7
    //% block="OLED show text %text|on line %line"
    export function microIoT_showUserText(line: number, text: string): void {
        microIoT_setText(line, 0);
        for (let c of text) {
            microIoT_putChar(c);
        }

        for (let i = text.length; i < 16; i++) {
            microIoT_setText(line, i);
            microIoT_putChar(" ");
        }

    }
	/**
     * @param line line num (8 pixels per line), eg: 0
     * @param n value , eg: 2019
     * OLED  shows the number
     */
    //% weight=60
    //% group="OLED"
    //% line.min=0 line.max=7
    //% block="OLED show number %n|on line %line"

    export function microIoT_showUserNumber(line: number, n: number): void {
        microIoT.microIoT_showUserText(line, "" + n)
    }


    function microIoT_writeCustomChar(c: string) {
        for (let i = 0; i < 8; i++) {
            microIoT_writeData(c.charCodeAt(i));
        }
    }


    function microIoT_cmd(c: number) {
        pins.i2cWriteNumber(0x3C, c, NumberFormat.UInt16BE);
    }


    function microIoT_writeData(n: number) {
        let b = n;
        if (n < 0) { n = 0 }
        if (n > 255) { n = 255 }

        pins.i2cWriteNumber(0x3C, 0x4000 + b, NumberFormat.UInt16BE);
    }

    const DISPLAY_OFF = 0xAE;
    const DISPLAY_ON = 0xAF;
    const basicFont: string[] = [
        "\x00\x00\x00\x00\x00\x00\x00\x00", // " "
        "\x00\x00\x5F\x00\x00\x00\x00\x00", // "!"
        "\x00\x00\x07\x00\x07\x00\x00\x00", // """
        "\x00\x14\x7F\x14\x7F\x14\x00\x00", // "#"
        "\x00\x24\x2A\x7F\x2A\x12\x00\x00", // "$"
        "\x00\x23\x13\x08\x64\x62\x00\x00", // "%"
        "\x00\x36\x49\x55\x22\x50\x00\x00", // "&"
        "\x00\x00\x05\x03\x00\x00\x00\x00", // "'"
        "\x00\x1C\x22\x41\x00\x00\x00\x00", // "("
        "\x00\x41\x22\x1C\x00\x00\x00\x00", // ")"
        "\x00\x08\x2A\x1C\x2A\x08\x00\x00", // "*"
        "\x00\x08\x08\x3E\x08\x08\x00\x00", // "+"
        "\x00\xA0\x60\x00\x00\x00\x00\x00", // ","
        "\x00\x08\x08\x08\x08\x08\x00\x00", // "-"
        "\x00\x60\x60\x00\x00\x00\x00\x00", // "."
        "\x00\x20\x10\x08\x04\x02\x00\x00", // "/"
        "\x00\x3E\x51\x49\x45\x3E\x00\x00", // "0"
        "\x00\x00\x42\x7F\x40\x00\x00\x00", // "1"
        "\x00\x62\x51\x49\x49\x46\x00\x00", // "2"
        "\x00\x22\x41\x49\x49\x36\x00\x00", // "3"
        "\x00\x18\x14\x12\x7F\x10\x00\x00", // "4"
        "\x00\x27\x45\x45\x45\x39\x00\x00", // "5"
        "\x00\x3C\x4A\x49\x49\x30\x00\x00", // "6"
        "\x00\x01\x71\x09\x05\x03\x00\x00", // "7"
        "\x00\x36\x49\x49\x49\x36\x00\x00", // "8"
        "\x00\x06\x49\x49\x29\x1E\x00\x00", // "9"
        "\x00\x00\x36\x36\x00\x00\x00\x00", // ":"
        "\x00\x00\xAC\x6C\x00\x00\x00\x00", // ";"
        "\x00\x08\x14\x22\x41\x00\x00\x00", // "<"
        "\x00\x14\x14\x14\x14\x14\x00\x00", // "="
        "\x00\x41\x22\x14\x08\x00\x00\x00", // ">"
        "\x00\x02\x01\x51\x09\x06\x00\x00", // "?"
        "\x00\x32\x49\x79\x41\x3E\x00\x00", // "@"
        "\x00\x7E\x09\x09\x09\x7E\x00\x00", // "A"
        "\x00\x7F\x49\x49\x49\x36\x00\x00", // "B"
        "\x00\x3E\x41\x41\x41\x22\x00\x00", // "C"
        "\x00\x7F\x41\x41\x22\x1C\x00\x00", // "D"
        "\x00\x7F\x49\x49\x49\x41\x00\x00", // "E"
        "\x00\x7F\x09\x09\x09\x01\x00\x00", // "F"
        "\x00\x3E\x41\x41\x51\x72\x00\x00", // "G"
        "\x00\x7F\x08\x08\x08\x7F\x00\x00", // "H"
        "\x00\x41\x7F\x41\x00\x00\x00\x00", // "I"
        "\x00\x20\x40\x41\x3F\x01\x00\x00", // "J"
        "\x00\x7F\x08\x14\x22\x41\x00\x00", // "K"
        "\x00\x7F\x40\x40\x40\x40\x00\x00", // "L"
        "\x00\x7F\x02\x0C\x02\x7F\x00\x00", // "M"
        "\x00\x7F\x04\x08\x10\x7F\x00\x00", // "N"
        "\x00\x3E\x41\x41\x41\x3E\x00\x00", // "O"
        "\x00\x7F\x09\x09\x09\x06\x00\x00", // "P"
        "\x00\x3E\x41\x51\x21\x5E\x00\x00", // "Q"
        "\x00\x7F\x09\x19\x29\x46\x00\x00", // "R"
        "\x00\x26\x49\x49\x49\x32\x00\x00", // "S"
        "\x00\x01\x01\x7F\x01\x01\x00\x00", // "T"
        "\x00\x3F\x40\x40\x40\x3F\x00\x00", // "U"
        "\x00\x1F\x20\x40\x20\x1F\x00\x00", // "V"
        "\x00\x3F\x40\x38\x40\x3F\x00\x00", // "W"
        "\x00\x63\x14\x08\x14\x63\x00\x00", // "X"
        "\x00\x03\x04\x78\x04\x03\x00\x00", // "Y"
        "\x00\x61\x51\x49\x45\x43\x00\x00", // "Z"
        "\x00\x7F\x41\x41\x00\x00\x00\x00", // """
        "\x00\x02\x04\x08\x10\x20\x00\x00", // "\"
        "\x00\x41\x41\x7F\x00\x00\x00\x00", // """
        "\x00\x04\x02\x01\x02\x04\x00\x00", // "^"
        "\x00\x80\x80\x80\x80\x80\x00\x00", // "_"
        "\x00\x01\x02\x04\x00\x00\x00\x00", // "`"
        "\x00\x20\x54\x54\x54\x78\x00\x00", // "a"
        "\x00\x7F\x48\x44\x44\x38\x00\x00", // "b"
        "\x00\x38\x44\x44\x28\x00\x00\x00", // "c"
        "\x00\x38\x44\x44\x48\x7F\x00\x00", // "d"
        "\x00\x38\x54\x54\x54\x18\x00\x00", // "e"
        "\x00\x08\x7E\x09\x02\x00\x00\x00", // "f"
        "\x00\x18\xA4\xA4\xA4\x7C\x00\x00", // "g"
        "\x00\x7F\x08\x04\x04\x78\x00\x00", // "h"
        "\x00\x00\x7D\x00\x00\x00\x00\x00", // "i"
        "\x00\x80\x84\x7D\x00\x00\x00\x00", // "j"
        "\x00\x7F\x10\x28\x44\x00\x00\x00", // "k"
        "\x00\x41\x7F\x40\x00\x00\x00\x00", // "l"
        "\x00\x7C\x04\x18\x04\x78\x00\x00", // "m"
        "\x00\x7C\x08\x04\x7C\x00\x00\x00", // "n"
        "\x00\x38\x44\x44\x38\x00\x00\x00", // "o"
        "\x00\xFC\x24\x24\x18\x00\x00\x00", // "p"
        "\x00\x18\x24\x24\xFC\x00\x00\x00", // "q"
        "\x00\x00\x7C\x08\x04\x00\x00\x00", // "r"
        "\x00\x48\x54\x54\x24\x00\x00\x00", // "s"
        "\x00\x04\x7F\x44\x00\x00\x00\x00", // "t"
        "\x00\x3C\x40\x40\x7C\x00\x00\x00", // "u"
        "\x00\x1C\x20\x40\x20\x1C\x00\x00", // "v"
        "\x00\x3C\x40\x30\x40\x3C\x00\x00", // "w"
        "\x00\x44\x28\x10\x28\x44\x00\x00", // "x"
        "\x00\x1C\xA0\xA0\x7C\x00\x00\x00", // "y"
        "\x00\x44\x64\x54\x4C\x44\x00\x00", // "z"
        "\x00\x08\x36\x41\x00\x00\x00\x00", // "{"
        "\x00\x00\x7F\x00\x00\x00\x00\x00", // "|"
        "\x00\x41\x36\x08\x00\x00\x00\x00", // "}"
        "\x00\x02\x01\x01\x02\x01\x00\x00"  // "~"
    ];




    let _brightness = 255
    let neopixel_buf = pins.createBuffer(16 * 3);
    for (let i = 0; i < 16 * 3; i++) {
        neopixel_buf[i] = 0
    }

    /** 
     * Set the three primary color:red, green, and blue
     * @param r  , eg: 100
     * @param g  , eg: 100
     * @param b  , eg: 100
     */

    //% weight=60
    //% group="RGB"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% block="red|%r green|%g blue|%b"
    export function microIoT_rgb(r: number, g: number, b: number): number {
        return (r << 16) + (g << 8) + (b);
    }

    /**
     * RGB LEDs light up from A to B
     * @param from  , eg: 1
     * @param to  , eg: 4
     */

    //% weight=60
    //% group="RGB"
    //% from.min=1 from.max=4
    //% to.min=1 to.max=4
    //% block="RGB LEDs |%from to |%to"
    export function microIoT_ledRange(from: number, to: number): number {
        return ((from-1) << 16) + (2 << 8) + (to);
    }

    /**
     * Set the color of the specified LEDs
     * @param index  , eg: 1
     */

    //% weight=60
    //% group="RGB"
    //% index.min=1 index.max=4
    //% rgb.shadow="colorNumberPicker"
    //% block="RGB LED |%index show color|%rgb"
    export function microIoT_setIndexColor(index: number, rgb: number) {
        let f = index-1;
        let t = index-1;
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);

        if ((index-1) > 15) {
            if ((((index-1) >> 8) & 0xFF) == 0x02) {
                f = (index-1) >> 16;
                t = (index-1) & 0xff;
            } else {
                f = 0;
                t = -1;
            }
        }
        for (let i = f; i <= t; i++) {
            neopixel_buf[i * 3 + 0] = Math.round(g)
            neopixel_buf[i * 3 + 1] = Math.round(r)
            neopixel_buf[i * 3 + 2] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)

    }

    /**
     * Set the color of all RGB LEDs
     */

    //% weight=60
    //% group="RGB"
    //% rgb.shadow="colorNumberPicker"
    //% block="show color |%rgb"
    export function microIoT_showColor(rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        for (let i = 0; i < 16 * 3; i++) {
            if ((i % 3) == 0)
                neopixel_buf[i] = Math.round(g)
            if ((i % 3) == 1)
                neopixel_buf[i] = Math.round(r)
            if ((i % 3) == 2)
                neopixel_buf[i] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)
    }

    /**
     * Set the brightness of RGB LED
     * @param brightness  , eg: 100
     */

    //% weight=70
    //% group="RGB"
    //% brightness.min=0 brightness.max=255
    //% block="set brightness to |%brightness"
    export function microIoT_setBrightness(brightness: number) {
        _brightness = brightness;
    }

    /**
     * Turn off all RGB LEDs
     */

    //% weight=40
    //% group="RGB"
    //% block="Turn off all RGB"
    export function microIoT_ledBlank() {
        microIoT_showColor(0)
    }

    /**
     * RGB LEDs display rainbow colors 
     */

    //% weight=50
    //% group="RGB"
    //% startHue.defl=1
    //% endHue.defl=360
    //% startHue.min=0 startHue.max=360
    //% endHue.min=0 endHue.max=360
    //% blockId=led_rainbow block="show rainbow color from|%startHue to|%endHue"
    export function ledRainbow(startHue: number, endHue: number) {
        startHue = startHue >> 0;
        endHue = endHue >> 0;
        const saturation = 100;
        const luminance = 50;
        let steps = 3 + 1;
        const direction = HueInterpolationDirection.Clockwise;

        //hue
        const h1 = startHue;
        const h2 = endHue;
        const hDistCW = ((h2 + 360) - h1) % 360;
        const hStepCW = Math.idiv((hDistCW * 100), steps);
        const hDistCCW = ((h1 + 360) - h2) % 360;
        const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
        let hStep: number;
        if (direction === HueInterpolationDirection.Clockwise) {
            hStep = hStepCW;
        } else if (direction === HueInterpolationDirection.CounterClockwise) {
            hStep = hStepCCW;
        } else {
            hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
        }
        const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

        //sat
        const s1 = saturation;
        const s2 = saturation;
        const sDist = s2 - s1;
        const sStep = Math.idiv(sDist, steps);
        const s1_100 = s1 * 100;

        //lum
        const l1 = luminance;
        const l2 = luminance;
        const lDist = l2 - l1;
        const lStep = Math.idiv(lDist, steps);
        const l1_100 = l1 * 100

        //interpolate
        if (steps === 1) {
            writeBuff(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
        } else {
            writeBuff(0, hsl(startHue, saturation, luminance));
            for (let i = 1; i < steps - 1; i++) {
                const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                const s = Math.idiv((s1_100 + i * sStep), 100);
                const l = Math.idiv((l1_100 + i * lStep), 100);
                writeBuff(0 + i, hsl(h, s, l));
            }
            writeBuff(3, hsl(endHue, saturation, luminance));
        }
        ws2812b.sendBuffer(neopixel_buf, DigitalPin.P15)
    }

    export enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }

    function writeBuff(index: number, rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        neopixel_buf[index * 3 + 0] = Math.round(g)
        neopixel_buf[index * 3 + 1] = Math.round(r)
        neopixel_buf[index * 3 + 2] = Math.round(b)
    }

    function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;

        return (r << 16) + (g << 8) + b;
    }

    /**
     * Get the distance information of ultrasonic return
     */
    //% weight=40
    //% group="Sensor"
    //% block="read ultrasonic sensor unit(cm), trig|%T echo|%E (cm)"
    export function ultraSonic(T: PIN, E: PIN, ): number {
        let maxCmDistance = 500;
        let ultraSonic_T;
        let ultraSonic_E;
        switch (T) {
            case PIN.P0: ultraSonic_T = DigitalPin.P0; break;
            case PIN.P1: ultraSonic_T = DigitalPin.P1; break;
            case PIN.P2: ultraSonic_T = DigitalPin.P2; break;
            case PIN.P8: ultraSonic_T = DigitalPin.P8; break;
            case PIN.P12: ultraSonic_T = DigitalPin.P12; break;
            case PIN.P13: ultraSonic_T = DigitalPin.P13; break;
            case PIN.P14: ultraSonic_T = DigitalPin.P14; break;
            case PIN.P16: ultraSonic_T = DigitalPin.P16; break;
            default: ultraSonic_T = DigitalPin.P0; break;
        }

        switch (E) {
            case PIN.P0: ultraSonic_E = DigitalPin.P0; break;
            case PIN.P1: ultraSonic_E = DigitalPin.P1; break;
            case PIN.P2: ultraSonic_E = DigitalPin.P2; break;
            case PIN.P8: ultraSonic_E = DigitalPin.P8; break;
            case PIN.P12: ultraSonic_E = DigitalPin.P12; break;
            case PIN.P13: ultraSonic_E = DigitalPin.P13; break;
            case PIN.P14: ultraSonic_E = DigitalPin.P14; break;
            case PIN.P16: ultraSonic_E = DigitalPin.P16; break;
            default: ultraSonic_E = DigitalPin.P0; break;
        }

        let ultraSonic_d;
        pins.digitalWritePin(ultraSonic_T, 1);
        basic.pause(1)
        pins.digitalWritePin(ultraSonic_T, 0);
        if (pins.digitalReadPin(ultraSonic_E) == 0) {
            pins.digitalWritePin(ultraSonic_T, 1);
            pins.digitalWritePin(ultraSonic_T, 0);
            ultraSonic_d = pins.pulseIn(ultraSonic_E, PulseValue.High, maxCmDistance * 58);
        } else {
            pins.digitalWritePin(ultraSonic_T, 0);
            pins.digitalWritePin(ultraSonic_T, 1);
            ultraSonic_d = pins.pulseIn(ultraSonic_E, PulseValue.Low, maxCmDistance * 58);
        }
        let ultraSonic_x = ultraSonic_d / 39;
        if (ultraSonic_x <= 0 || ultraSonic_x > 500) {
            return 0;
        }
        return Math.round(ultraSonic_x);

    }
    /**
     * Set the flame sensor pin to obtain the flame sensor value
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin flame sensor "
    export function flame(pin: PIN_1): number {
        let flame_T;
        switch (pin) {
            case PIN_1.P0: flame_T = AnalogPin.P0; break;
            case PIN_1.P1: flame_T = AnalogPin.P1; break;
            case PIN_1.P2: flame_T = AnalogPin.P2; break;
            default: flame_T = AnalogPin.P0; break;
        }
        return pins.analogReadPin(flame_T);
    }

    /**
     * Set the soil moisture sensor pin to get the soil moisture
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin soil moisture sensor"
    export function soilMoisture(pin: PIN_1): number {
        let soilMoisture_T;
        switch (pin) {
            case PIN_1.P0: soilMoisture_T = AnalogPin.P0; break;
            case PIN_1.P1: soilMoisture_T = AnalogPin.P1; break;
            case PIN_1.P2: soilMoisture_T = AnalogPin.P2; break;
            default: soilMoisture_T = AnalogPin.P0; break;
        }
        return Math.round(pins.analogReadPin(soilMoisture_T));
    }
   
    /**
     * Set the temperature and humidity sensor pin to obtain the temperature and humidity value
     */
    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin|%index"
    export function index(pin: PIN, index: DT11): number {

        let index_T;
        switch (pin) {
            case PIN.P0: index_T = DigitalPin.P0; break;
            case PIN.P1: index_T = DigitalPin.P1; break;
            case PIN.P2: index_T = DigitalPin.P2; break;
            case PIN.P8: index_T = DigitalPin.P8; break;
            case PIN.P12: index_T = DigitalPin.P12; break;
            case PIN.P13: index_T = DigitalPin.P13; break;
            case PIN.P14: index_T = DigitalPin.P14; break;
            case PIN.P16: index_T = DigitalPin.P16; break;
            default: index_T = DigitalPin.P0; break;
        }
        pins.digitalWritePin(index_T, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(index_T)
        pins.setPull(index_T, PinPullMode.PullUp);
        switch (index) {
            case 1:
                let dhtvalue1 = 0;
                let dhtcounter1 = 0;
                let dhtcounter1d = 0;
                while (pins.digitalReadPin(index_T) == 1);
                while (pins.digitalReadPin(index_T) == 0);
                while (pins.digitalReadPin(index_T) == 1);
                for (let i = 0; i <= 32 - 1; i++) {
                    dhtcounter1d = 0
                    while (pins.digitalReadPin(index_T) == 0)
                    {
                        dhtcounter1d += 1;
                    }
                    dhtcounter1 = 0
                    while (pins.digitalReadPin(index_T) == 1) {
                        dhtcounter1 += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter1 > dhtcounter1d) {
                            dhtvalue1 = dhtvalue1 + (1 << (31 - i));
                        }
                    }
                }
                basic.pause(1500)
                return ((dhtvalue1 & 0x0000ff00) >> 8);
                break;
            case 2:
                while (pins.digitalReadPin(index_T) == 1);
                while (pins.digitalReadPin(index_T) == 0);
                while (pins.digitalReadPin(index_T) == 1);
                let dhtvalue = 0;
                let dhtcounter = 0;
                let dhtcounterd = 0;
                for (let i = 0; i <= 32 - 1; i++) {
                    dhtcounterd = 0
                    while (pins.digitalReadPin(index_T) == 0) {
                        dhtcounterd += 1;
                    }
                    dhtcounter = 0
                    while (pins.digitalReadPin(index_T) == 1) {
                        dhtcounter += 1;
                    }
                    if (i > 15) {
                        if (dhtcounter > dhtcounterd) {
                            dhtvalue = dhtvalue + (1 << (31 - i));
                        }
                    }
                }
                basic.pause(1500)
                return Math.round((((dhtvalue & 0x0000ff00) >> 8) * 9 / 5) + 32);
            case 3:
                while (pins.digitalReadPin(index_T) == 1);
                while (pins.digitalReadPin(index_T) == 0);
                while (pins.digitalReadPin(index_T) == 1);

                let value = 0;
                let counter = 0;
                let counterd = 0;
                for (let i = 0; i <= 8 - 1; i++) {
                    counterd = 0
                    while (pins.digitalReadPin(index_T) == 0)
                    {
                        counterd += 1;
                    }
                    counter = 0
                    while (pins.digitalReadPin(index_T) == 1) {
                        counter += 1;
                    }
                    if (counter > counterd) {
                        value = value + (1 << (7 - i));
                    }
                }
                basic.pause(1500)
                return value;
            default:
                basic.pause(1500)
                return 0;
        }
    }

   

    /**
     * Set the fan control pin to control the fan
     */
    //% weight=40
    //% group="Motor"
    //% block="small fanset %fan at %pin"
    export function fan(pin: PIN, fan: Switch): void {
        let fan_T;
        switch (pin) {
            case PIN.P0: fan_T = DigitalPin.P0; break;
            case PIN.P1: fan_T = DigitalPin.P1; break;
            case PIN.P2: fan_T = DigitalPin.P2; break;
            case PIN.P8: fan_T = DigitalPin.P8; break;
            case PIN.P12: fan_T = DigitalPin.P12; break;
            case PIN.P13: fan_T = DigitalPin.P13; break;
            case PIN.P14: fan_T = DigitalPin.P14; break;
            case PIN.P16: fan_T = DigitalPin.P16; break;
            default: fan_T = DigitalPin.P0; break;
        }
        pins.digitalWritePin(fan_T, fan)
    }

    /**
     * Initialize month, year, day, hour, minute and second
     */
    //% weight=100
    //% group="Time"
    //% blockId=microIoT_setTime block="set year %year|month %month|day %day||hour %hour|minute %minute|second %second"
    //% year.min=2000 year.max=9999 month.min=1 month.max=12 day.min=1 day.max=31 hour.min=0 hour.max=23 minute.min=0 month.max=59 second.min=0 second.max=59
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    //% year.defl=2020 month.defl=1 day.defl=31 
    export function setTime(year: number, month: number, day: number, hour?: number, minute?: number, second?: number): void {
        let buf = pins.createBuffer(7);
        let state;
        compare(year, month, day);
        buf[0] = 0x16;
        buf[1] = year-2000;
        buf[2] = month;
        buf[3] = day;
        buf[4] = hour;
        buf[5] = minute;
        buf[6] = second;
        pins.i2cWriteBuffer(0x10, buf);
        let data;
        while(true){
            pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
            let buffer = pins.i2cReadBuffer(0x10, 7)
            data = buffer[0]+2000
            basic.pause(50)
            if(data == year){
                return;
            }
        }
    }
    /**
     * Set year
     */
    //% weight=99
    //% group="Time"
    //% year.min=2000 year.max=9999
    //% blockId=microIoT_setYear block="set year %year"
    //% year.defl=2020
    export function setYear(year:number):void{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buf = pins.i2cReadBuffer(0x10, 7);
        let buffer = pins.createBuffer(7);
        buf[0] = 0x16;
        buf[1] = year-2000;
        buf[2] = buffer[1];
        buf[3] = buffer[2];
        buf[4] = buffer[3];
        buf[5] = buffer[4];
        buf[6] = buffer[5];
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * Set month
     */
    //% weight=98
    //% group="Time"
    //% month.min=1 month.max=12
    //% blockId=microIoT_setMonth block="set month %month"
    //% month.defl=1
    export function setMonth(month:number):void{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buf = pins.i2cReadBuffer(0x10, 7);
        let buffer = pins.createBuffer(7);
        buf[0] = 0x16;
        buf[1] = buffer[0];
        buf[2] = month;
        buf[3] = buffer[2];
        buf[4] = buffer[3];
        buf[5] = buffer[4];
        buf[6] = buffer[5];
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * Set day
     */
    //% weight=97
    //% group="Time"
    //% day.min=1 day.max=31
    //% blockId=microIoT_setDay block="set day %day"
    //% day.defl=1
    export function setDay(day:number):void{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buf = pins.i2cReadBuffer(0x10, 7);
        let buffer = pins.createBuffer(7);
        compare(buffer[0],buffer[1],day);
        buf[0] = 0x16;
        buf[1] = buffer[0];
        buf[2] = buffer[1];
        buf[3] = day;
        buf[4] = buffer[3];
        buf[5] = buffer[4];
        buf[6] = buffer[5];
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * Set hours
     */
    //% weight=96
    //% group="Time"
    //% hour.min=0 hour.max=23
    //% blockId=microIoT_setHour block="set hour %hour"
    export function setHour(hour:number):void{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buf = pins.i2cReadBuffer(0x10, 7);
        let buffer = pins.createBuffer(7);
        buf[0] = 0x16;
        buf[1] = buffer[0];
        buf[2] = buffer[1];
        buf[3] = buffer[2];
        buf[4] = hour;
        buf[5] = buffer[4];
        buf[6] = buffer[5];
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * Set minutes
     */
    //% weight=95
    //% group="Time"
    //% minute.min=0 minute.max=59
    //% blockId=microIoT_setMinute block="set minute %minute"
    export function setMinute(minute:number):void{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buf = pins.i2cReadBuffer(0x10, 7);
        let buffer = pins.createBuffer(7);
        buf[0] = 0x16;
        buf[1] = buffer[0];
        buf[2] = buffer[1];
        buf[3] = buffer[2];
        buf[4] = buffer[3];
        buf[5] = minute;
        buf[6] = buffer[5];
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * Set seconds
     */
    //% weight=95
    //% group="Time"
    //% second.min=0 second.max=59
    //% blockId=microIoT_setSecond block="set second %second"
    export function setSecond(second:number):void{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buf = pins.i2cReadBuffer(0x10, 7);
        let buffer = pins.createBuffer(7);
        buf[0] = 0x16;
        buf[1] = buffer[0];
        buf[2] = buffer[1];
        buf[3] = buffer[2];
        buf[4] = buffer[3];
        buf[5] = buffer[4];
        buf[6] = second;
        pins.i2cWriteBuffer(0x10, buf);
    }
    /**
     * Git time
     */
    //% weight=94
    //% group="Time"
    //% blockId=microIoT_setWhole block="get %time"
    export function readTime(time:Time):number{
        pins.i2cWriteNumber(0x10, 0x20, NumberFormat.Int8LE)
        let buffer = pins.i2cReadBuffer(0x10, 7)
        let data:number;
        switch(time){
            case Time.year: data = buffer[0]+2000;break;
            case Time.month:data = buffer[1];break;
            case Time.day:  data = buffer[2];break;
            case Time.hour: data = buffer[3];break;
            case Time.minute:data = buffer[4];break;
            default: data = buffer[5];break;
        }
        return data;
    }
   
    function compare(year:number, month:number, day:number):void{
        if(month == 2){
           let state = (((year%4==0)&&(year%100!=0))||(year%400==0))?1:0;
            if(state ==1){
                if(day>29){
                    while(1){
                        basic.showString("February has only 29 days!!!!!!")
                    }
                }
            }else{
                if(day>28){
                    while(1){
                        basic.showString("February has only 28 days!!!!!!")
                    }
                }
            }
        }else if(month == 4){
            if(day > 30){
                while(1){
                        basic.showString("April has only 30 days!!!!!!")
                }
            }
        }else if(month == 6){
            if(day > 30){
                while(1){
                        basic.showString("June has only 30 days!!!!!!")
                }
            }
        }else if(month == 9){
            if(day > 30){
                while(1){
                        basic.showString("September has only 30 days!!!!!!")
                }
            }
        }else if (month == 11){
            if(day > 30){
                while(1){
                        basic.showString("November has only 30 days!!!!!!")
                }
            }
        }
    }

    //% weight=40
    //% group="Sensor"
    //% block="read pin|%pin Hall sensor"
    export function hall(pin: PIN): number {
        let index_T;
        switch (pin) {
            case PIN.P0: index_T = DigitalPin.P0; break;
            case PIN.P1: index_T = DigitalPin.P1; break;
            case PIN.P2: index_T = DigitalPin.P2; break;
            case PIN.P8: index_T = DigitalPin.P8; break;
            case PIN.P12: index_T = DigitalPin.P12; break;
            case PIN.P13: index_T = DigitalPin.P13; break;
            case PIN.P14: index_T = DigitalPin.P14; break;
            case PIN.P16: index_T = DigitalPin.P16; break;
            default: index_T = DigitalPin.P0; break;
        }
        return pins.digitalReadPin(index_T);
    }

}
