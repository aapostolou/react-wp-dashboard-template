<?php

$table_name = 'test_table';

self::create_table($table_name, "(
	id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);");
