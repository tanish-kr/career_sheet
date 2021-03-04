/* career_sheet schemas */

CREATE TABLE IF NOT EXISTS profiles (
  id bigint UNSIGNED NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  address varchar(255),
  birthday date,
  gender smallint(1) UNSIGNED,
  about text,
  nearest_station varchar(255),
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS companies (
  id bigint UNSIGNED NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  employment_form varchar(255) NOT NULL,
  start_on date NOT NULL,
  end_on date,
  employees int(11) UNSIGNED,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS projects (
  id bigint UNSIGNED NOT NULL auto_increment,
  summary text,
  job_role smallint(2) UNSIGNED,
  members int(11),
  start_on date NOT NULL,
  end_on date,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS technologies (
  id bigint UNSIGNED NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS genres (
  id bigint UNSIGNED NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS qualifications (
  id bigint UNSIGNED NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  acquisition_date date NOT NULL,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS links (
  id bigint UNSIGNED NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  url varchar(1024) NOT NULL,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS project_technologies (
  id bigint NOT NULL auto_increment,
  project_id bigint UNSIGNED NOT NULL,
  technology_id bigint UNSIGNED NOT NULL,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY fk_project_technologies_project_id (project_id) REFERENCES projects (id),
  FOREIGN KEY fk_project_technologies_technology_id (technology_id) REFERENCES technologies (id),
  UNIQUE KEY uk_project_technologies (project_id, technology_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS technology_genres (
  id bigint NOT NULL auto_increment,
  technology_id bigint UNSIGNED NOT NULL,
  genre_id bigint UNSIGNED NOT NULL,
  created_at datetime NOT NULL default CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY fk_technology_genres_technology_id (technology_id) REFERENCES technologies (id),
  FOREIGN KEY fk_technology_genres_genre_id (genre_id) REFERENCES genres (id),
  UNIQUE KEY uk_technology_genres (technology_id, genre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE=utf8_unicode_ci;
