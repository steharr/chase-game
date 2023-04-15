package chasegame.config;

import chasegame.setup.infrastructure.GameSetup;
import chasegame.setup.infrastructure.GameType;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.Objects;

@Profile("PROD")
@Configuration
@EnableJpaRepositories(
        basePackageClasses = {GameSetup.class, GameType.class},
        entityManagerFactoryRef = "h2EntityManagerFactory",
        transactionManagerRef = "h2DatabaseTransactionManager"

)
public class H2JpaConfig {

    @Bean
    public LocalContainerEntityManagerFactoryBean h2EntityManagerFactory(@Qualifier("h2DataSource") DataSource dataSource, EntityManagerFactoryBuilder builder) {
        return builder
                .dataSource(dataSource)
                .packages(GameSetup.class, GameType.class)
                .build();
    }

    @Bean
    public PlatformTransactionManager h2DatabaseTransactionManager(
            @Qualifier("h2EntityManagerFactory") LocalContainerEntityManagerFactoryBean entF) {
        return new JpaTransactionManager(Objects.requireNonNull(entF.getObject()));
    }
}
