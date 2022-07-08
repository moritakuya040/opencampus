const Alexa = require('ask-sdk-core'); //require()関数でAlexa Skills Kit SDKのパッケージに含まれる「alexa-sdk」を読み込み
var answer = [];

// リクエストハンドラーを定義
// 「...を開いて」と発話した時の処理
const LaunchRequestHandler = {
    canHandle(handlerInput) {　// ハンドラーが処理すべきリクエストであればtureを返す
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'; 
    },
    handle(handlerInput) {
        const repeat = '研究室適性検査をはじめるよ。二つの質問に答えてね。準備はいい？';
        const reprompt = '準備はいい？';
        answer.push(1);
        
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "Labrecommend"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg"
                    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        return handlerInput.responseBuilder // 以下responseBuilderオブジェクトの関数
            .speak(repeat) // 応答内容の文字列をセット
            .reprompt(reprompt) // Alexaからの質問にユーザーが応答しない場合の再プロンプトの文言をセット
            .getResponse(); // スキルインターフェースへの応答を生成して返す
    },
};

const FieldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'FieldIntent'; // インテント名
    },
    handle(handlerInput){
        //const field = handlerInput.requestEnvelope.request.intent.slots.menu.value;
        
        const repeat = 'タイプワンについて二つ質問するよ。「はい」か「いいえ」で答えてね。第一問、化学は好き？';
        const reprompt = '第一問、化学は好き？';
        answer[0]=0; 
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "FieldDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                    "nowQuestionInfo": {
                        "questionDt": "化学は好き？",
                        "imageUrlA": "https://pictkan.com/uploads/cache/1145320191/chemistry-740453_1920-400x270-MM-100.jpg"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        
        //
        
        return handlerInput.responseBuilder // 以下responseBuilderオブジェクトの関数
            .speak(repeat) // 応答内容の文字列をセット
            .reprompt(reprompt) // Alexaからの質問にユーザーが応答しない場合の再プロンプトの文言をセット
            .getResponse(); // スキルインターフェースへの応答を生成して返す
 
    }
}

//はい
const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YesIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = '次の質問には「イエス」か「ノー」で答えてね。第二問、研究室のメンバーでBBQがしたい？';
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YesDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                        "nowQuestionInfo": {
                            "questionDt": "研究室のメンバーでBBQがしたい？",
                            "imageUrlA": "https://2.bp.blogspot.com/-POB-37ic5Ro/U8XkBZ7MvvI/AAAAAAAAipY/FWiDDuDfVjQ/s800/bbq_couple.png"
                        }
                    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        if(answer[0]===0){
            answer[0]=2;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};

//イエス
const YestwoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YestwoIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には安田先生の研究室をおすすめするよ。安田先生は燃える氷と呼ばれるハイドレートを作る研究をしているよ。ハイドレートは二酸化炭素の吸収や海水淡水化への応用が期待されているそうだ。氷だからって食べたらお腹壊しちゃうぞ。興味のある人はぜひエネ環にきてね！';
        

                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YestwoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                        "nowQuestionInfo": {
                            "questionDt": "安田研究室だよ！",
                            "primaryText1": "安田先生は燃える氷と呼ばれるハイドレートを作る",
                            "primaryText2": "研究をしているよ。ハイドレートは二酸化炭素の吸収や",
                            "primaryText3": "海水淡水化への応用が期待されているそうだ。",
                            "primaryText4": "氷だからって食べたらお腹壊しちゃうぞ。",
                            "primaryText5": "興味のある人はぜひエネ環にきてね！ ",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/yasudaken.png"
        }
    }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        if(answer[0]===2){
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};
//野菜が好き
const YesthreeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'YesthreeIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君にはせなは　先生の研究室をおすすめするよ。';
        
        //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "YesthreeDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                        "aplData": {
                        "skillName": "エネルギー環境工学コース",
                        "textName": "研究室紹介",
                        "secondtextName": "〜オープンキャンパスへようこそ〜",
                        "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                        "comment": "",
                        "nowQuestionInfo": {
                            "questionDt": "瀬名波研究室だよ！",
                            "primaryText1": "",
                            "primaryText2": "",
                            "primaryText3": "",
                            "primaryText4": "",
                            "primaryText5": "",
                            "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/senaha.png"
                        }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        
        if(answer[0]===3){    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};
//いいえ
const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NoIntent'; // インテント名
    },

    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = '次の質問には「肉が好き」か「野菜が好き」で答えてね。第二問、肉と野菜どっちが好き？';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                            "aplData": {
                            "skillName": "エネルギー環境工学コース",
                            "textName": "研究室紹介",
                            "secondtextName": "〜オープンキャンパスへようこそ〜",
                            "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                            "comment": "以下の項目はプログラム内で動的にセットされる。(そのため、値を定義しておく必要ないんですが、ハンズオン時にオーサリングツールに直接貼り付けできるようにあえて残しています)",
                            "nowQuestionInfo": {
                                "questionDt": "「肉」と「野菜」どっちが好き？",
                                "imageUrlA": "https://thumb.ac-illust.com/1a/1ad4dd307e6008f932e93b13dd19de5d_t.jpeg"
                            }
                        }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        if(answer[0]===0){
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("おい何やってんだよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
    },
};

//ノー
const NotwoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NotwoIntent'; // インテント名
    },
    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君にはせなは　先生の研究室をおすすめするよ。';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NotwoDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "",
                    "nowQuestionInfo": {
                        "questionDt": "瀬名波研だよ",
                        "primaryText1": "",
                        "primaryText2": "",
                        "primaryText3": "",
                        "primaryText4": "",
                        "primaryText5": "",
                        "imageUrlA": "https://ocam.s3.ap-northeast-1.amazonaws.com/senaha.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        if(answer[0]===2){
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=0;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
        
    },
};


//肉が好き
const NothreeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' // リクエストの種類
            && handlerInput.requestEnvelope.request.intent.name === 'NothreeIntent'; // インテント名
    },
    handle(handlerInput) { // 実際にハンドラ－が行う処理を記述
        const speechText = 'そんな君には松田先生の研究室をおすすめするよ。松田先生は物質の熱の伝わり方を研究しているよ。 工業的にとても大切で、小惑星探査機「はやぶさ」にも応用されているそうだ。 君の心にも熱が伝わったね、ぜひエネ環コースへ来てね！ ';
        
                //ここにAPLで作成したデザインを追加
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            console.log("ユーザーのデバイスはAPLに対応しています");
        
            const documentName = "NothreeDocument"; // オーサリングツールに保存されたドキュメントの名前
            const token = documentName + "Token";
        
            // RenderDocumentディレクティブを応答に追加します
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: 'token',
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: {
                    "aplData": {
                    "skillName": "エネルギー環境工学コース",
                    "textName": "研究室紹介",
                    "secondtextName": "〜オープンキャンパスへようこそ〜",
                    "skillImageUrl": "https://pbs.twimg.com/profile_images/976370597356716032/lnxEPYPG_400x400.jpg",
                    "comment": "",
                    "nowQuestionInfo": {
                        "questionDt": "松田研究室だよ！",
                        "primaryText1": "松田先生は物質の熱の伝わり方を研究しているよ。",
                        "primaryText2": "工業的にとても大切で、小惑星探査機",
                        "primaryText3": "「はやぶさ」にも応用されているそうだ。",
                        "primaryText4": "君の心にも熱が伝わったね。",
                        "primaryText5": "興味のある人はぜひエネ環にきてね！ ",
                        "imageUrlA": "https://iicc.skr.u-ryukyu.ac.jp/matching/img/2017/04/03f9a24ebc8399513a8d2eb3fa3f84f8-320x199.png"
                    }
                }
                }
            });
            
        } else {
            // デバイスがAPLに対応していないことをログに記録するだけです。
            // 実際のスキルでは、ユーザーに別の内容を読み上げることもできます。
            console.log("ユーザーのデバイスはAPLに対応していません。画面付きのデバイスで再テストしてください")
        }
        //
        
        if(answer[0]===3){    
            return handlerInput.responseBuilder
                .speak(speechText)
                .reprompt(speechText)
                .getResponse();
        }else{
            answer[0]=3;
            return handlerInput.responseBuilder
                .speak("返事を間違えちゃってるよー")
                .withSimpleCard(speechText)
                .reprompt(speechText)
                .getResponse();
        }
        
    },
};


const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) { 
        const speechText = '研究室適性検査をはじめるよ。二つの質問に答えてね。';
        const reprompt = '準備はいい？';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            //.withSimpleCard('Hello World', speechText)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'エネ環に来てね！';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(speechText)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() { 
        return true; // errorハンドラーを1つだけ定義する場合は、戻り値を常にtureに設定する
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`); // handle()関数は第2引数にerrorオブジェクトを受け取る

        return handlerInput.responseBuilder
            .speak('うまく聞き取れませんでした。')
            .reprompt('もう一度お願いします。')
            .getResponse();
    },
};

const skillBuilder = Alexa.SkillBuilders.custom(); // Alexa.SkillBuilders.custom()関数でスキルビルダーと呼ばれるオブジェクトを取得

exports.handler = skillBuilder 
    .addRequestHandlers( // 上で定義したハンドラーオブジェクトを渡す
        LaunchRequestHandler,
        FieldIntentHandler,
        YesIntentHandler,
        YestwoIntentHandler,
        NotwoIntentHandler,
        NoIntentHandler,
        NothreeIntentHandler,
        YesthreeIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler) // エラーハンドラーオブジェクトを渡す
    .lambda(); //lambda関数を呼び出し、lambda関数ハンドラーを取得、そのままexports.handlerにセット