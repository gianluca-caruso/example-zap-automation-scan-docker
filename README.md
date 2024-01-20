# Example OWASP ZAP Automation Framework with docker

## Introduction
This is a simple example of how to use the OWASP ZAP Automation Framework with docker to automate the execution of a scan plan.


### docker

Powershell
```bash
$ docker run --rm -e DISPLAY=:0 -v ${pwd}:/zap/wrk/:rw -v ${pwd}/logs/zap.log:/home/zap/.ZAP/zap.log -t softwaresecurityproject/zap-stable zap.sh -cmd -autorun /zap/wrk/zap.yml
```

Bash
```bash
$ docker run --rm -e DISPLAY=:0 -v $(pwd):/zap/wrk/:rw -v $(pwd)/logs/zap.log:/home/zap/.ZAP/zap.log -t softwaresecurityproject/zap-stable zap.sh -cmd -autorun /zap/wrk/zap.yml
```


### References

* [OWASP ZAP](https://www.zaproxy.org/)
* [OWASP ZAP Automation Framework](https://www.zaproxy.org/docs/automate/automation-framework/)
