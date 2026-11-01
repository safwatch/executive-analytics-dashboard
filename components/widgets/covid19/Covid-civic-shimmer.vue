<script>
 import SimpleShimmer from "simple-shimmer";

export default {
    components: {
            SimpleShimmer,
    },
    props: {
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
    <div class="col-xl-3 col-md-3">
        <div class="card w-100">
            <div class="card-body">
                <div class="row d-flex justify-content-between ">
                    <!-- <div col-xl-9 col-md-9> -->
                        <div>
                            <simple-shimmer :style="{height:'12px', width:'80px', borderRadius:'8px'}"/>
                            <simple-shimmer :style="{height:'12px', width:'80px', borderRadius:'8px'}"/>
                            <simple-shimmer :style="{height:'12px', width:'130px', borderRadius:'8px'}"/>
                            <simple-shimmer :style="{height:'12px', width:'130px', borderRadius:'8px'}"/>
                            <simple-shimmer :style="{height:'12px', width:'130px', borderRadius:'8px'}"/>
                        </div>
                        <simple-shimmer :style="{height:'40px', width:'40px', borderRadius:'100%'}"/>
                    
                </div>
            </div>
        </div>
    </div>

</template>
