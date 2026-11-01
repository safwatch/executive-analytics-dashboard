<script>
import SimpleShimmer from "simple-shimmer";
export default {
    components: {
            SimpleShimmer,
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
    <div class="col-md-6 d-flex">
        <div class="card w-100">
            <div class="card-body">
                <div class="avatar-lg float-left mr-3">
                    <simple-shimmer :style="{height:'50px', width:'50px', borderRadius:'100%'}"/>
                </div>
                <h5 class="text-muted font-weight-normal mt-0 text-truncate" title="Jawa Barat"><simple-shimmer :style="{height:'12px', width:'140px', borderRadius:'8px'}"/></h5>
                <h5 class="text-muted font-weight-normal mt-0 text-truncate" title="Jawa Barat"><simple-shimmer :style="{height:'12px', width:'80px', borderRadius:'8px'}"/></h5>
                
            </div>
        </div>
    </div>

</template>
