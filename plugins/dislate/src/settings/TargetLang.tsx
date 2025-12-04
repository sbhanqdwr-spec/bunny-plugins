import { getAssetIDByName } from "@vendetta/ui/assets"
import { React, ReactNative } from "@vendetta/metro/common"
import { Forms, Search } from "@vendetta/ui/components"
import { showToast } from "@vendetta/ui/toasts"
import { useProxy } from "@vendetta/storage"
import { settings } from ".."
import { DeepLLangs, GTranslateLangs } from "../lang"

const { FormRow } = Forms
const { ScrollView } = ReactNative

export default () => {
    useProxy(settings)

    const [query, setQuery] = React.useState("")
    const [apiKey, setApiKey] = React.useState(settings.apiKey ?? "")

    if (settings.translator == 0) {
        // DeepL (لن نستخدمه مع ChatGPT لكن نتركه كما هو)
        return (
            <ScrollView style={{ flex: 1 }}>
                {/* إدخال OpenAI API Key */}
                <Search
                    style={{ padding: 15 }}
                    placeholder="OpenAI API Key (sk-...)"
                    value={apiKey}
                    onChangeText={(text: string) => {
                        setApiKey(text)
                        ;(settings as any).apiKey = text
                        showToast("Saved OpenAI API Key", getAssetIDByName("check"))
                    }}
                />

                {/* اختيار اللغة */}
                <Search
                    style={{ padding: 15 }}
                    placeholder="Search Language"
                    onChangeText={(text: string) => {
                        setQuery(text)
                    }}
                />
                {Object.entries(DeepLLangs)
                    .filter(([key]) =>
                        key.toLowerCase().includes(query.toLowerCase())
                    )
                    .map(([key, value]) => (
                        <FormRow
                            label={key}
                            trailing={() => <FormRow.Arrow />}
                            onPress={() => {
                                if (settings.target_lang == value) return
                                settings.target_lang = value
                                showToast(
                                    `Saved ToLang to ${key}`,
                                    getAssetIDByName("check")
                                )
                            }}
                        />
                    ))}
            </ScrollView>
        )
    } else {
        // GTranslate = ChatGPT الآن
        return (
            <ScrollView style={{ flex: 1 }}>
                {/* إدخال OpenAI API Key */}
                <Search
                    style={{ padding: 15 }}
                    placeholder="OpenAI API Key (sk-...)"
                    value={apiKey}
                    onChangeText={(text: string) => {
                        setApiKey(text)
                        ;(settings as any).apiKey = text
                        showToast("Saved OpenAI API Key", getAssetIDByName("check"))
                    }}
                />

                {/* اختيار اللغة */}
                <Search
                    style={{ padding: 15 }}
                    placeholder="Search Language"
                    onChangeText={(text: string) => {
                        setQuery(text)
                    }}
                />
                {Object.entries(GTranslateLangs)
                    .filter(([key]) =>
                        key.toLowerCase().includes(query.toLowerCase())
                    )
                    .map(([key, value]) => (
                        <FormRow
                            label={key}
                            trailing={() => <FormRow.Arrow />}
                            onPress={() => {
                                if (settings.target_lang == value) return
                                settings.target_lang = value
                                showToast(
                                    `Saved ToLang to ${key}`,
                                    getAssetIDByName("check")
                                )
                            }}
                        />
                    ))}
            </ScrollView>
        )
    }
}
