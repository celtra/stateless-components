<template>
    <table>
        <tr v-for="prop in propsList" :key="prop.name" class="prop">
            <td class="prop-name">{{ prop.name }}</td>
            <td class="prop-value">
                <div v-if="prop.availableValues && prop.availableValues.length >= 10">
                    <select @change="$emit('change', { name: prop.name, value: $event.target.value })">
                        <option v-for="value in prop.availableValues" :key="value">{{ value }}</option>
                    </select>
                </div>
                <div v-else-if="typeof(prop.default) == typeof(true)">
                    <input :checked="prop.value"
                           type="checkbox"
                           @change="$emit('change', { name: prop.name, value: $event.target.checked })" />
                </div>
                <div v-else>
                    <input :value="prop.value"
                           :disabled="prop.name === 'theme' || prop.name === 'size'"
                           type="text"
                           @input="$emit('change', { name: prop.name, value: $event.target.value })" />
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        propsList: { type: Array, required: true },
    },
}
</script>

<style lang="less" scoped>
.prop {
    .prop-name {
        padding-right: 10px;
        text-align: right;
        font-size: 12px;
    }
    .prop-value {
        padding-left: 10px;
    }
}
</style>
