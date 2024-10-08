////////////////
// Lottie USB //
////////////////

var animParams = {
    wrapper: document.getElementById('bodymovin'),
    animType: 'html',
    loop: true,
    prerender: false,
    autoplay: true,
    path: './assets/anim/lottie_usb_stick.json'
};
var anim = bodymovin.loadAnimation(animParams);
window.onresize = anim.resize.bind(anim);

///////////////////
// Lottie Loader //
///////////////////

const loadingSegment = [0, 120];
const successSegment = [239, 400];
const errorSegment = [658, 822];
const successSegmentDuration = successSegment[1] - successSegment[0] - 1;
const errorSegmentDuration = errorSegment[1] - errorSegment[0] - 1;
var loaderAnimParams = {
    wrapper: document.getElementById('bodymovin'),
    animType: 'html',
    loop: true,
    prerender: true,
    autoplay: true,
    animationData: lottieAnimLoader,
};
const message = document.getElementById('message');
const connectButton = document.getElementById("connectButton");
connectButton.addEventListener('click', () => {
    if (navigator.serial) {
        anim.destroy(); // remove previous animation
        anim = bodymovin.loadAnimation(loaderAnimParams);
        anim.playSegments(loadingSegment, true);
        window.onresize = anim.resize.bind(anim);
        startKdfWorker();
    } else {
        alert('Error: Web Serial API is not supported by your browser.');
    }
});
connectButton.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) { // <ENTER> key
        event.preventDefault();
        document.getElementById("connectButton").click();
    }
});

//////////////////
// onPageLoaded //
//////////////////

document.addEventListener('DOMContentLoaded', function() {
    const n6Field = document.getElementById('n6');
    const n1Field = document.getElementById('n1');
    n1Field.autofocus = true;
    n1Field.addEventListener('input', function() {
        document.getElementById('n1').nextElementSibling.focus();
    });
    document.getElementById('n2').addEventListener('input', function() {
        document.getElementById('n2').nextElementSibling.focus();
    });
    document.getElementById('n3').addEventListener('input', function() {
        document.getElementById('n3').nextElementSibling.focus();
    });
    document.getElementById('n3').addEventListener('input', function() {
        document.getElementById('n3').nextElementSibling.focus();
    });
    document.getElementById('n4').addEventListener('input', function() {
        document.getElementById('n4').nextElementSibling.focus();
    });
    document.getElementById('n5').addEventListener('input', function() {
        document.getElementById('n5').nextElementSibling.focus();
    });
    document.getElementById('n6').addEventListener('input', function() {
        document.getElementById('n6').nextElementSibling.focus();
    });

    n1Field.addEventListener('focus', function() {
        document.getElementById('n1').value = '';
        document.getElementById('n2').value = '';
        document.getElementById('n3').value = '';
        document.getElementById('n4').value = '';
        document.getElementById('n5').value = '';
        document.getElementById('n6').value = '';
    });
    document.getElementById('n2').addEventListener('focus', function() {
        document.getElementById('n2').value = '';
        document.getElementById('n3').value = '';
        document.getElementById('n4').value = '';
        document.getElementById('n5').value = '';
        document.getElementById('n6').value = '';
    });
    document.getElementById('n3').addEventListener('focus', function() {
        document.getElementById('n3').value = '';
        document.getElementById('n4').value = '';
        document.getElementById('n5').value = '';
        document.getElementById('n6').value = '';
    });
    document.getElementById('n4').addEventListener('focus', function() {
        document.getElementById('n4').value = '';
        document.getElementById('n5').value = '';
        document.getElementById('n6').value = '';
    });
    document.getElementById('n5').addEventListener('focus', function() {
        document.getElementById('n5').value = '';
        document.getElementById('n6').value = '';
    });

    n6Field.addEventListener('focus', function() {
        document.getElementById('n6').value = '';
    });
    n6Field.addEventListener('change', function() {
        document.getElementById("connectButton").click();
    });

    n1Field.addEventListener("keypress", function(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // 48-57 for 0-9 numbers; 8 for backspace; 0 for null values;
            evt.preventDefault();
        }
    });
    document.getElementById('n2').addEventListener("keypress", function(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // 48-57 for 0-9 numbers; 8 for backspace; 0 for null values;
            evt.preventDefault();
        }
    });
    document.getElementById('n3').addEventListener("keypress", function(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // 48-57 for 0-9 numbers; 8 for backspace; 0 for null values;
            evt.preventDefault();
        }
    });
    document.getElementById('n4').addEventListener("keypress", function(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // 48-57 for 0-9 numbers; 8 for backspace; 0 for null values;
            evt.preventDefault();
        }
    });
    document.getElementById('n5').addEventListener("keypress", function(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // 48-57 for 0-9 numbers; 8 for backspace; 0 for null values;
            evt.preventDefault();
        }
    });
    document.getElementById('n6').addEventListener("keypress", function(evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            // 48-57 for 0-9 numbers; 8 for backspace; 0 for null values;
            evt.preventDefault();
        }
    });
});

function getParameterValue(parameterName) {
    // get the URL of the current page
    const url = window.location.href;
    // parse the URL to extract the query parameters
    const urlParams = new URLSearchParams(url.split('?')[1]);
    // get the value of the specified parameter
    return urlParams.get(parameterName);
}

////////////////
// KDF Worker //
////////////////

async function startKdfWorker() {
    message.style.marginTop = '30px';
    message.innerHTML = "Generating hash...";

    chrome.storage.local.get('selectedDomain', function(resultDomain) {
        if (!chrome.runtime.error && resultDomain.selectedDomain != undefined) {
            const domain = resultDomain.selectedDomain;

            chrome.storage.sync.get(domain, function(result) {
                if (!chrome.runtime.error && result[domain] != undefined) {
                    try {
                        const pin = document.getElementById('n1').value += document.getElementById('n2').value += document.getElementById('n3').value += document.getElementById('n4').value += document.getElementById('n5').value += document.getElementById('n6').value;
                        var data = "";
                        data += domain; //ex: "google"
                        data += result[domain]; //ex: "web@turtlpass.com"
                        // console.log(data)
                        var sha512 = hex_sha512(data);

                        // Example usage:
                        const actionValue = getParameterValue('action');
                        if (actionValue !== null && (actionValue === 'password' || actionValue === 'otp')) {
                            const params = {
                                action: actionValue,
                                pass: pin,
                                salt: sha512,
                                time: 32, // number of iterations
                                mem: 65536, // 64 MiB memory cost
                                hashLen: 64,
                                parallelism: 4, // number of threads in parallel
                                type: 1 // Argon2Type.Argon2i
                            };
                            kdfWorker('simd', params);

                        } else {
                            alert('Action Error');
                        }
                    } catch (errorMsg) {
                        alert(errorMsg);
                    }
                }
            });
        }
    });
}

var worker;
function kdfWorker(method, params) {
    if (worker) {
        if (worker.method === method) {
            // Using loaded worker
            worker.postMessage({ calc: method, arg: params });
            return;
        } else {
            worker.terminate();
        }
    }
    console.log('Starting worker...');

    worker = new Worker('js/kdf-worker.js');
    worker.method = method;
    var loaded = false;

    worker.onmessage = function (e) {
        if (e.data.command && e.data.hash) {
            connectSerial(e.data.command, e.data.hash);
        } else if (!loaded) {
            loaded = true;
            worker.postMessage({ calc: method, arg: params });
        }
    };
}

function loadScript(src, onload, onerror) {
    var el = document.createElement('script');
    el.src = src;
    el.onload = onload;
    el.onerror = onerror;
    document.body.appendChild(el);
}

function log(msg) {
    if (!msg) return;
    console.log(msg);
}

////////////////
// USB Serial //
////////////////

var port, textEncoder, writableStreamClosed, writer;
let keepReading = true;
let reader;

async function connectSerial(command, hash) {
    message.style.marginTop = '30px';
    message.innerHTML = "Connecting to your TurtlPass device...";

    try {
        port = await navigator.serial.requestPort({
            filters: [{ usbVendorId: 0x2E8A }] // Raspberry Pi
        });
        await port.open({ baudRate: 115200 });

        readUntilClosed();

        textEncoder = new TextEncoderStream();
        writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        writer = textEncoder.writable.getWriter();
        var dataToSend;
        if (command === '@') {
            // Get Otp Code With Secret From EEPROM, given a user hash and the current timestamp
            // @4dff4...46510a:1676821524
            const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
            dataToSend = '@' + hash + ':' + currentTimestampInSeconds + "\n";
        } else {
            dataToSend = '/' + hash + "\n";
        }
        writer.write(dataToSend);

    } catch (errorMsg) {
        console.log(errorMsg);

        if (errorMsg == 'NotFoundError: No port selected by the user.') {
            showError('Device not found! Please Try Again');
        } else {
            showError('Connection error! Please Try Again');
        }
    }
}

async function readUntilClosed() {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();
    var success = false;

    while (port.readable && keepReading) {
        try {
            while (true) {
                const {
                    value,
                    done
                } = await reader.read();
                if (done) {
                    // |reader| has been canceled.
                    break;
                }
                if (value.includes('<PASSWORD-READY>')
                 || value.includes('<OTP-READY>')) {
                    keepReading = false;
                    success = true;
                    break;
                } else if (value.includes('<PASSWORD-INVALID-LENGTH>')
                        || value.includes('<PASSWORD-INVALID-INPUT>')
                        || value.includes('<PASSWORD-ERROR>')
                        || value.includes('<OTP-ERROR>')) {
                    keepReading = false;
                    success = false;
                    break;
                }
            }
        } catch (error) {
            if (error != 'NetworkError: The device has been lost.') {
                alert(error);
            }
        } finally {
            await reader.releaseLock();
        }
    }
    if (success) {
        showSuccess('Success! The Device is Ready');
    } else {
        showError('Error! Please Try Again');
    }
}

function showSuccess(successMessage) {
    anim.addEventListener('enterFrame', function(event) {
        if (Math.floor(event.currentTime) == successSegmentDuration) {
            anim.removeEventListener('enterFrame', this);
            anim.pause();
            message.innerHTML = successMessage;
            setTimeout(function() {
                window.close(); // close this tab
            }, 1500);
        }
    });
    anim.playSegments(successSegment, true);
    window.onresize = anim.resize.bind(anim);
}

function showError(errorMessage) {
    anim.addEventListener('enterFrame', function(event) {
        if (Math.floor(event.currentTime) == errorSegmentDuration) {
            anim.removeEventListener('enterFrame', this);
            anim.pause();
            message.innerHTML = errorMessage;
            setTimeout(function() {
                window.location.reload(true); // reload this tab
            }, 2500);
        }
    });
    anim.playSegments(errorSegment, true);
    window.onresize = anim.resize.bind(anim);
}
