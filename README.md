# docomoTTS.js

[docomo Developer support](https://dev.smt.docomo.ne.jp)で公開されている[音声合成API](https://dev.smt.docomo.ne.jp/?p=docs.api.page&api_name=text_to_speech&p_name=api_usage_scenario)を、JavaScriptで使用するjsです。あらかじめ、APIキーを取得しておく必要があります。

## 現時点の課題

* エーアイ社提供のものしか作っていない
* Safariなど、一部未対応のブラウザがある(おそらくWeb Audio APIの`AudioContext.createBuffer()`メソッドを使っているため)

未熟者のコードですので、非常に使い勝手は悪いと思われます。悪い部分はご指摘いただけると幸いです。

## 使い方

```javascript
var key = 'APIキーの文字列';
var ssml = '<?xml version="1.0" encoding="utf-8" ?><speak version="1.1"><voice name="sumire"><prosody rate="1.0" pitch="1.0">こんにちは。これからよろしくおねがいします。</prosody></voice></speak>';

var tts = new TTS_AI(key);
tts.download(ssml, tts.play);
```
## ライセンス

MITライセンス

ただし、[docomoのガイドライン](https://dev.smt.docomo.ne.jp/?p=docs.api.page&api_name=text_to_speech&p_name=guideline#tag01)を遵守して下さい。