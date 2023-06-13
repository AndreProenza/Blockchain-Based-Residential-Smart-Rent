package io.unlockit;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Unlockit API",
				version = "1.0.0",
				description = "Unlockit API for Smart Rent Frontend",
				termsOfService = "All rights reserved for Unlockit.io under Andre Proenza permission",
				contact = @Contact(
					name = "Andre Proenza",
						email = "andreproenzadeveloper@gmail.com"
				),
				license = @License(
						name = "GNU GPLv3",
						url = "https://choosealicense.com/licenses/gpl-3.0/"
				)
		)
)
public class BackendApplication {

	// Swagger UI - https://localhost:4000/swagger-ui/index.html

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
