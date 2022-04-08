# IoT Cloud Kit

[IoT Cloud Kit for micro:bit is an IoT theme kit that provides an excellent solution to IoT classroom teaching and supports various IoT platforms like IFTTT, ThingSpeak, Easy IoT, etc. The kit includes all kinds of Gravity sensors that can be combined with IoT platforms to make projects involving automation services, remote control, data collection and analysis. For example, volume analysis, remote light control, fire prevention, the exploration of the relation of light and heat, etc. ](https://wiki.dfrobot.com/_SKU_KIT0161-EN_IoT_Cloud_Kit_for_micro:bit)

## Basic usage

* Wi-Fi configuration module：connect the network via configuration module

```blocks

    microIoT.microIoT_WIFI("yourSSID", "yourPASSWORD")

```

* MQTT platform access configuration: access to Easyiot_ CN, EasyIOT_ EN, SIOT platforms via configuration module

```blocks

    input.onButtonPressed(Button.A, function () {
        microIoT.microIoT_SendMessage("mess", microIoT.TOPIC.topic_0)
    })
    microIoT.microIoT_WIFI("dfrobotGuest", "dfrobot2020")
    microIoT.microIoT_MQTT(
        "yourIotId",
        "yourIotPwd",
        "yourIotTopic",
        microIoT.SERVERS.China
    )
    microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "yourIotTopic")

```
* IFTTT platform configuration: access to IFTTT via configuration module  

```blocks

    input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_http_post("Hi", "DFRobot", "2020")
    })
    microIoT.microIoT_WIFI("dfrobotGuest", "dfrobot2020")
    microIoT.microIoT_http_IFTTT("yourEvent", "yourKey")

```
* ThingSpeak platform configuration: send information to ThingSpeak via configuration module 

```blocks

    input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_http_TK_GET("your write api key", "2020")
    })
    microIoT.microIoT_WIFI("dfrobotGuest", "dfrobot2020")

```
* Steering gear and motor control module

```blocks

    basic.forever(function () {
        microIoT.microIoT_MotorRun(microIoT.aMotors.M1, microIoT.Dir.CW, 0)
        basic.pause(1000)
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
        basic.pause(1000)
        microIoT.microIoT_motorStop(microIoT.aMotors.M1)
        basic.pause(1000)
    })

```
* The module under the sensor label is used to obtain sensor data information

```blocks

    basic.forever(function () {
        serial.writeValue("x1", microIoT.ultraSonic(PIN.P0, PIN.P1))
        serial.writeValue("x2", microIoT.flame(PIN_1.P2))
        serial.writeValue("x3", microIoT.index(PIN.P8, DT11.temperature_C))
    })

```


## License

MIT

Copyright (c) 2020, microbit/micropython Chinese community  

## Supported targets

* for PXT/microbit