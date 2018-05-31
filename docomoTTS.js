window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

/**
 * DOCOMO 音声合成API(株式会社エーアイ用)
 * @param {string} api_key DOCOMOから提供されるAPIキー 
 */
 var TTS_AI = function(api_key) {
    if (api_key == '') console.error('APIKEY is empty.');
    // リクエストURLの設定
    this.requestUrl = 'https://api.apigw.smt.docomo.ne.jp/aiTalk/v1/textToSpeech?APIKEY=' + api_key;

    /**
     * 合成音声をダウンロード
     * @param {string} ssml 音声合成リクエスト用のSSMLテキスト
     * @param {function(string)} callback 文字列を引数とするコールバック関数
     */
    this.download = function (ssml, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST',this.requestUrl);
        xhr.setRequestHeader('Content-Type','application/ssml+xml');
        xhr.setRequestHeader('Accept','audio/L16');
        xhr.overrideMimeType('text\/plain; charset=x-user-defined');

        xhr.onload = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    callback(this.responseText);
                } else {
                    console.error('Download is failed.')
                }
            }
        };

        xhr.send(ssml);
    }

    /**
     * 合成音声を再生
     * @param {string} lpcm PCMデータ情報が格納された文字列
     */
    this.play = function(lpcm) {
        var channels = 1;
        var frameCount = lpcm.length / 2;
        var myAudioBuffer = audioCtx.createBuffer(channels, frameCount, 16000);

        for (var channel = 0; channel < channels; channel++) {
            var nowBuffering = myAudioBuffer.getChannelData(channel,16,16000);
            for (var i = 0; i < frameCount; i++) {
                var unsignedWord = ((lpcm.charCodeAt(i * 2) & 0xff) << 8) + (lpcm.charCodeAt(i * 2 + 1) & 0xff);
                var signedWord = (unsignedWord + 32768) % 65536 - 32768;
                nowBuffering[i] = signedWord / 32768.0;
            }
        }

        var source = audioCtx.createBufferSource();
        source.buffer = myAudioBuffer;

        source.connect(audioCtx.destination);
        source.start();
    }
 }