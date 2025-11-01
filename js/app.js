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
                        //console.log('sha512: ' + sha512);

                        const actionValue = getParameterValue('action');
                        if (actionValue !== null && actionValue === 'password') {
                            const params = {
                                action: actionValue,
                                pass: pin.toString(),      // convert PIN to string
                                salt: sha512,              // SHA-512 hex string
                                time: 32,                  // iterations
                                mem: 65536,                // memory in KiB
                                hashLen: 64,               // output length
                                parallelism: 4,            // threads
                                type: 2                    // Argon2Type.ID = 2
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
    //console.log('Starting worker...');
    worker = new Worker('js/kdf-worker.js');
    worker.method = method;
    var loaded = false;
    worker.onmessage = function (e) {
        if (e.data.hash) {
            connectSerial(e.data.hash);
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

function hexStringToBytes(hex) {
    if (hex.length % 2 !== 0) throw new Error("Invalid hex string");
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
}

////////////////
// USB Serial //
////////////////

var port, writer, reader;

async function connectSerial(hash, length = 100, charset = proto.turtlpass.Charset.LETTERS_NUMBERS) {
    message.style.marginTop = '30px';
    message.innerText = "Connecting to your TurtlPass device...";

    try {
        // Request and open serial port
        port = await navigator.serial.requestPort({
            filters: [{ usbVendorId: 0x1209, usbProductId: 0xFA55 }]
        });
        await port.open({ baudRate: 115200 });

        writer = port.writable.getWriter();
        reader = port.readable.getReader();

        // Build protobuf command
        const cmd = new proto.turtlpass.Command();
        cmd.type = proto.turtlpass.CommandType.GENERATE_PASSWORD;

        const genParams = new proto.turtlpass.GeneratePasswordParams();

        genParams.entropy = hexStringToBytes(hash);  // raw bytes from hex

        // Assign values to your params
        genParams.length = length;

        // Ensure charset is a numeric enum value
        const charsetValue = typeof charset === "string"
            ? proto.turtlpass.Charset[charset] ?? proto.turtlpass.Charset.LETTERS_NUMBERS
            : charset;
        genParams.charset = charsetValue;

        cmd.genPass = genParams;

        // Serialize command with 2-byte little-endian length prefix
        const messageBytes = proto.turtlpass.Command.encode(cmd).finish();
        const fullMessage = new Uint8Array(2 + messageBytes.length);
        fullMessage[0] = messageBytes.length & 0xff;
        fullMessage[1] = (messageBytes.length >> 8) & 0xff;
        fullMessage.set(messageBytes, 2);

        // Send to device
        await writer.write(fullMessage);

        // Read response
        const resp = await readProtoResponse();
        const errorName = proto.turtlpass.ErrorCode[resp.error] || 'UNKNOWN_ERROR';

        if (resp.success) {
            showSuccess('Success! The Device is Ready');
        } else {
            showError(`Error: ${errorName}`);
        }

    } catch (err) {
        if (err instanceof DOMException) {
            console.error("DOMException:", err.name, err.message, err.code);
            showError(`Serial Error: ${err.name} - ${err.message}`);
        } else {
            console.error("Unknown Error:", err);
            showError(`Unexpected Error: ${err}`);
        }
    } finally {
        if (reader) { await reader.releaseLock(); reader = null; }
        if (writer) { await writer.releaseLock(); writer = null; }
    }
}

async function readProtoResponse() {
    let buffer = new Uint8Array(0);

    while (true) {
        const { value, done } = await reader.read();
        if (done) throw new Error("Device disconnected");
        if (!value) continue;

        // Append new chunk to buffer
        const newBuffer = new Uint8Array(buffer.length + value.length);
        newBuffer.set(buffer, 0);
        newBuffer.set(value, buffer.length);
        buffer = newBuffer;

        // Wait until we have at least 2 bytes for length prefix
        if (buffer.length < 2) continue;

        const length = buffer[0] | (buffer[1] << 8);

        // Wait until the full message is received
        if (buffer.length < 2 + length) continue;

        const messageBytes = buffer.slice(2, 2 + length);

        // Remove processed bytes from buffer
        buffer = buffer.slice(2 + length);

        // Decode protobuf message
        return proto.turtlpass.Response.decode(messageBytes);
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
