<script>
export default {
    props: {
        id:{
            type: Number,
            required: true,
        },
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
        },
        text: {
            type: String,
            required: true,
        },
        status:{
            type: String,
            required: true
        },
        val:{
            type: Object,
            required: true
        }
    },
    data() {
        return {};
    },
};
</script>

<template>
<div class="card w-100">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <div>
                <h5 class="text-muted font-weight-normal mt-0 text-truncate" title="Campaign Sent">{{ title }}</h5>
                <h3 class="my-2 py-1">
                    <span data-plugin="counterup">{{ value }}</span>
                </h3>
                <p class="mb-0 text-muted">
                    <div class="text-muted" v-if="id === 1">
                        <small class="d-block">Konfirmasi Aktif : <b class="text-secondary">{{ val._1 }}</b></small>
                        <small class="d-block">Sembuh : <b class="text-secondary">{{ val._2 }}</b></small>
                        <small class="d-block">Meninggal : <b class="text-secondary">{{ val._3 }}</b></small>
                    </div>

                    <div class="text-muted" v-if="id === 2">
                        <small class="d-block">Isolasi/Dalam Perawatan : <b class="text-secondary">{{ val._1 }}</b></small>
                        <small class="d-block">Discarded : <b class="text-secondary">{{ val._2 }}</b></small>
                        <small class="d-block">Meninggal : <b class="text-secondary">{{ val._3 }}</b></small>
                    </div>

                    <div class="text-muted" v-if="id === 3">
                        <small class="d-block">Isolasi/Dalam Perawatan : <b class="text-secondary">{{ val._1 }}</b></small>
                        <small class="d-block">Discarded : <b class="text-secondary">{{ val._2 }}</b></small>
                    </div>

                    <div class="text-muted" v-if="id === 4">
                        <small class="d-block">Isolasi : <b class="text-secondary">{{ val._1 }}</b></small>
                        <small class="d-block">Discarded : <b class="text-secondary">{{ val._2 }}</b></small>
                    </div>
                </p>
            </div>
            <div class="avatar-sm">
                <span class="avatar-title bg-soft-primary rounded" v-if="status === 'same'">
                    <i class="ri-indeterminate-circle-line font-20 text-primary"></i>
                </span>
                <span class="avatar-title bg-soft-success rounded" v-else-if="status === 'down'">
                    <i class="ri-arrow-down-circle-line font-20 text-success"></i>
                </span>
                <span class="avatar-title bg-soft-danger rounded" v-else-if="status === 'up'">
                    <i class="ri-arrow-up-circle-line font-20 text-danger"></i>
                </span>

            </div>
        </div>
    </div>
</div>
</template>
