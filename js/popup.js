function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    window.mdc.autoInit();
});


function getDomainWithoutSubdomain(url) {
    const urlParts = new URL(url).hostname.split('.')
    return urlParts
        .slice(0)
        .slice(-(urlParts.length === 4 ? 3 : 2))
        .join('.')
}

function getDomainFirstPart(hostname) {
    return hostname.split('.').shift()
    // shift() method removes the first element from an array and returns that element
}


//////////////////
// onPageLoaded //
//////////////////

const onChangeSaveDomainEmail = () => {
    const domainField = document.getElementById('domain');
    const emailField = document.getElementById('email');
    const domainValue = domainField.value;
    const emailValue = emailField.value;
    if (domainValue != undefined && domainValue.length > 0) {
        if (emailValue != undefined && emailValue.length > 0) {
            chrome.storage.sync.set({
                [domainValue]: emailValue
            }, function() {
                // saved Pair< domain, email >
            });
        }
    }
};

const onBlurEmail = () => {
    // The blur event fires when an element has lost focus
};

function isEmpty(str) {
    return (!str || str.length === 0);
}

document.addEventListener('DOMContentLoaded', function() {
    // Domain
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, tabs => {
        if (tabs != undefined && tabs[0] != undefined && tabs[0].url != undefined) {
            const url = tabs[0].url;
            //const domain = getDomainWithoutSubdomain(url);
            const domain = getDomainFirstPart(getDomainWithoutSubdomain(url));
            var protocol = url.split(":")[0];

            // DOMAIN
            const domainField = document.getElementById('domain');
            if (protocol !== 'http' && protocol !== 'https' && protocol !== 'ftp') {
                //ex: chrome://extensions
                //ex: chrome-extension://
                domainField.value = '(Unsupported Page)';
            } else {
                domainField.value = domain;
                document.getElementById('favicon').src = 'https://s2.googleusercontent.com/s2/favicons?domain=' + url;

                chrome.storage.sync.get(domain, function(result) {
                    if (!chrome.runtime.error) {
                        //console.log(result);

                        var resultDomain = result[domain];
                        console.log('Value currently is ' + resultDomain);

                        if (resultDomain != undefined) {
                            // email found in cache
                            document.getElementById('email').value = resultDomain;
                            document.getElementById('favicon').src = 'https://s2.googleusercontent.com/s2/favicons?domain=' + url;

                        } else {
                            // email NOT found in cache
                        }
                    }
                });
            }
        } else {
            document.getElementById('domain').value = '<< Domain Not Found >>';
        }
    });

    const domainField = document.getElementById('domain');
    const emailField = document.getElementById('email');
    emailField.addEventListener('change', onChangeSaveDomainEmail);
    emailField.addEventListener('blur', onBlurEmail);
});

function persistEmailDomain(domain) {
    const domainField = document.getElementById('domain');
    const emailField = document.getElementById('email');
    const domainValue = domainField.value;
    const emailValue = emailField.value;
    chrome.storage.sync.set({
        domainValue: emailValue
    }, () => {
        // saved Pair< domain, email >
    });
    chrome.storage.sync.set({
        keyEmail: emailField.value
    }, () => {
        // email saved
    });
}

document.getElementById('unlockButton').addEventListener('click', () => {
    if (!document.getElementById('domain').value) {
        alert('The \'Domain\' field is empty.');
        return;
    }
    if (document.getElementById('domain').value === '(Unsupported Page)') {
        alert('This domain is not supported.');
        return;
    }
    
    if (!document.getElementById('email').value) {
        alert('The \'Account ID\' field is empty.');
        return;
    }
    if (navigator.serial) {
        const domainField = document.getElementById('domain');
        chrome.storage.local.set({
            'selectedDomain': domainField.value
        }, () => {
            // selectedDomain saved
        });
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('device.html'));
        }
    } else {
        alert('Web Serial API not supported.');
    }
});
