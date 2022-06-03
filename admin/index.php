<?php $token = generate_current_user_token(); ?>

<script>
  localStorage.setItem('token', "<?= $token ?>")
</script>

<div id="root"></div>