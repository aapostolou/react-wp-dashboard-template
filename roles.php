<?php

/* - Remove Default Roles - */
remove_role('subscriber');
remove_role('contributor');
remove_role('author');
remove_role('editor');

/* - Add Custom Roles - */
add_role('manager', 'Manager', array('level_5' => true));
add_role('viewuser', 'View User', array('level_1' => true));
add_role('user', 'User', array('level_0' => true));
