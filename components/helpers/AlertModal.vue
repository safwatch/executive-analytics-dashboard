<script>

import Swal from "sweetalert2";

export default {
    mounted() {
        this.callAlert();
    },
    methods :{
        callAlert() {
            Swal.fire({
                position: "top-end",
                type: "SATUDATA",
                title: "No Satudata Token Acquired",
                showConfirmButton: false,
                timer: 2500,
            });
        },
    }
}
</script>

<template>
<div class="modal">
    <!-- Modal content goes here -->
</div>
</template>