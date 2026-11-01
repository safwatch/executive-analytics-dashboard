<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        }
    },
    data() {
        return {};
    },
    methods: {
        formatThousand(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    }
};
</script>

<template>
<div class="card w-100">
    <div class="card-body">
        <div class="avatar-lg float-left mr-3">
            <i class="text-primary avatar-title display-4 m-0" :class="icon"></i>
        </div>
        <h5 class="text-muted font-weight-normal mt-0 text-truncate" title="Jawa Barat">{{ title }}</h5>
        <h3 class="my-2 py-1">
            <span data-plugin="counterup">{{ formatThousand(value) }}</span>
        </h3>
    </div>
</div>
</template>
