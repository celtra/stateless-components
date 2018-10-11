const getFlatVariations = (variations) => {
    let flat = [{}]

    for (const key of Object.keys(variations).sort((a, b) => a.localeCompare(b))) {
        let newFlat = []
        for (const value of variations[key]) {
            newFlat = newFlat.concat(flat.map(item => {
                return { ...item, [key]: value }
            }))
        }
        flat = newFlat
    }

    return flat
}

const getUsecaseName = (variation, usecaseIndex) => {
    const variationKeys = Object.keys(variation).sort((a, b) => a.localeCompare(b))
    const variationNames = variationKeys.map(key => `${key}-${variation[key]}`)
    return `usecase-${usecaseIndex}__${variationNames.join('_')}`
}

const getHash = (s) => {
    var a = 1, c = 0, h, o
    if (s) {
        a = 0
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h)
            a = (a<<6&268435455) + o + (o<<14)
            c = a & 266338304
            a = c!==0?a^c>>21:a
        }
    }
    return String(a)
}

export function getFlatUsecases (component, ignoreVariations = []) {
    const usecases = []
    if (component.usecases) {
        const variations = component.variations && component.variations || {}
        const filterVariations = {}
        for (const k in variations) {
            if (!ignoreVariations.includes(k)) {
                filterVariations[k] = variations[k]
            }
        }

        const flatVariations = getFlatVariations(filterVariations)
        for (var i = 0; i < component.usecases.length; i++) {
            for (const variation of flatVariations) {
                const usecase = component.usecases[i]
                const usecaseData = { ...variation, ...usecase }
                const name = getUsecaseName(variation, i)
                usecases.push({ data: usecaseData, usecaseIndex: i, name: name, uniqueID: getHash(name) })
            }
        }
    }
    return usecases
}
