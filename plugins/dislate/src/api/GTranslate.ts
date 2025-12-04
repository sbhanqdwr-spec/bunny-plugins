// ChatGPT Translator
// Requires: settings.apiKey to be set in plugin settings

import { GTranslateResponse } from "../type"
import { storage } from "@vendetta/plugin"

const translate = async (
    text: string,
    source_lang: string = "auto",
    target_lang: string,
    original: boolean = false
) => {
    try {
        if (original) return { source_lang, text }

        // Read API key from settings
        const apiKey = storage.apiKey
        if (!apiKey) {
            throw Error("⚠️ No OpenAI API key found. Go to plugin settings and add your key.")
        }

        const API_URL = "https://api.openai.com/v1/chat/completions"

        const body = {
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Translate the following text from ${source_lang} to ${target_lang}. Return ONLY the translated text.`
                },
                {
                    role: "user",
                    content: text
                }
            ]
        }

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            const err = await res.text()
            throw Error(`OpenAI Error: ${err}`)
        }

        const data = await res.json()
        const translated = data?.choices?.[0]?.message?.content?.trim()

        return {
            source_lang,
            text: translated || "⚠️ Translation failed."
        }

    } catch (e) {
        throw Error(`❌ Failed to translate using ChatGPT: ${e}`)
    }
}

export default { translate }
