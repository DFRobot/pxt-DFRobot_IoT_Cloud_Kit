


basic.forever(function () {
    microIoT.microIoT_MotorRun(microIoT.aMotors.M1, microIoT.Dir.CW, 0)
    basic.pause(1000)
    microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
    basic.pause(1000)
    microIoT.microIoT_motorStop(microIoT.aMotors.M1)
    basic.pause(1000)
})
