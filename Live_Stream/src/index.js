function randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
} 


//Examples
const hannah = {
    channelName: 'testchannel',
    key:'1c5b23'
};

const jake = {
    channelName: 'testchannel2', 
    key: '1431b1'
};

var people = [hannah, jake];

function verifyKey(key){
    for( let i = 0; i < people.length; i++){
        if(key === people[i].key){
            return String(people[i].channelName);
        }
    }
    alert("Incorrect Key!")
    return '';
    
}

function configureLogging() {
    function log(level, messages) {
        const text = messages
            .map(message => {
                if (typeof message === 'object') {
                    return JSON.stringify(message, null, 2);
                } else {
                    return message;
                }
            })
            .join(' ');
        $('#logs').append($(`<div class="${level.toLowerCase()}">`).text(`[${new Date().toISOString()}] [${level}] ${text}\n`));
    }
    console._error = console.error;
    console.error = function(...rest) {
        log('ERROR', Array.prototype.slice.call(rest));
        console._error.apply(this, rest);
    };

    console._warn = console.warn;
    console.warn = function(...rest) {
        log('WARN', Array.prototype.slice.call(rest));
        console._warn.apply(this, rest);
    };

    console._log = console.log;
    console.log = function(...rest) {
        log('INFO', Array.prototype.slice.call(rest));
        console._log.apply(this, rest);
    };
}

//Every peer needs a client ID, we will just generate random values for them
function getRandomClientId() {
    return Math.random()
        .toString(36)
        .substring(2)
        .toUpperCase();
}

//Values for each individual streamer
function getStreamerValues() {
    return {
        region: "us-east-2",
        channelName: $('#streamer').val(),
        clientId: getRandomClientId(),
        sendVideo: true,
        sendAudio: true,
        openDataChannel: false,
        widescreen: true,
        fullscreen: false,
        useTrickleICE: true,
        natTraversalDisabled: false,
        forceTURN: false,
        accessKeyId: "xxxxxxxxxxxxxxxxxx",
        endpoint: null,
        secretAccessKey: "xxxxxxxxxxxxxxxxxxxx",
        sessionToken: null,
    };
}

//Values for each individual streamer
function getViewerValues(){
    return {
        region: "us-east-2",
        channelName: verifyKey($('#streamKey').val()),
        clientId: getRandomClientId(),
        sendVideo: true,
        sendAudio: true,
        openDataChannel: false,
        widescreen: true,
        fullscreen: false,
        useTrickleICE: true,
        natTraversalDisabled: false,
        forceTURN: false,
        accessKeyId: "xxxxxxxxxxxxxx",
        endpoint: null,
        secretAccessKey: "xxxxxxxxxxxxxxx",
        sessionToken: null,
    };
}
//May want to create stat reports in the future for things like a view count
function onStatsReport(report) {
    // TODO: Publish stats
}

window.addEventListener('error', function(event) {
    console.error(event.message);
    event.preventDefault();
});

window.addEventListener('unhandledrejection', function(event) {
    console.error(event.reason.toString());
    event.preventDefault();
});

configureLogging();


$('#master-button').click(async () => {
    $('#form').addClass('d-none');
    $('#master').removeClass('d-none');
    //The local view is what the streamer will use to see themselves
    const localView = $('#master .local-view')[0];
    const streamValues = getStreamerValues();
    startMaster( localView, streamValues, onStatsReport);
});

//End stream button
$('#stop-master-button').click(async () => {
    stopMaster();

    $('#form').removeClass('d-none');
    $('#master').addClass('d-none');
});


//Start a viewer session
$('#viewer-button').click(async () => {
    $('#form').addClass('d-none');
    $('#viewer').removeClass('d-none');
    const remoteView = $('#viewer .remote-view')[0];
    const viewerValues = getViewerValues();
    startViewer(remoteView, viewerValues, onStatsReport);
});

//Leave stream
$('#stop-viewer-button').click(async () => {
    stopViewer();

    $('#form').removeClass('d-none');
    $('#viewer').addClass('d-none');
});

// Read/Write all of the fields to/from localStorage so that fields are not lost on refresh.
const urlParams = new URLSearchParams(window.location.search);
const fields = [
    { field: 'streamer', type: 'text'},
];
fields.forEach(({ field, type, name }) => {
    const id = '#' + field;

    // Read field from localStorage
    try {
        const localStorageValue = localStorage.getItem(field);
        if (localStorageValue) {
            if (type === 'checkbox' || type === 'radio') {
                $(id).prop('checked', localStorageValue === 'true');
            } else {
                $(id).val(localStorageValue);
            }
            $(id).trigger('change');
        }
    } catch (e) {
        /* Don't use localStorage */
    }

    // Write field to localstorage on change event
    $(id).change(function() {
        try {
            if (type === 'checkbox') {
                localStorage.setItem(field, $(id).is(':checked'));
            } else if (type === 'radio') {
                fields
                    .filter(fieldItem => fieldItem.name === name)
                    .forEach(fieldItem => {
                        localStorage.setItem(fieldItem.field, fieldItem.field === field);
                    });
            } else {
                localStorage.setItem(field, $(id).val());
            }
        } catch (e) {
            /* Don't use localStorage */
        }
    });
});

// The page is all setup. Hide the loading spinner and show the page content.
$('.loader').addClass('d-none');
$('#main').removeClass('d-none');
console.log('Page loaded');
