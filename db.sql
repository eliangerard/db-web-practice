--Este SQL crea la base de datos y la tabla que utilicé para la tarea

CREATE SCHEMA IF NOT EXISTS `frontend` DEFAULT CHARACTER SET utf8mb4 

CREATE TABLE IF NOT EXISTS `frontend`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `apellido` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `contraseña` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4