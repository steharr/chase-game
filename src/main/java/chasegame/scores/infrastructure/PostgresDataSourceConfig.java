package chasegame.scores.infrastructure;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.*;

import javax.sql.DataSource;

@Profile("PROD")
@Configuration
@PropertySources({
        @PropertySource("classpath:prod.properties"),
})
public class PostgresDataSourceConfig {

    @Value("${db.driver}")
    private String driver;
    @Value("${db.url}")
    private String url;

    @Value("${db.user}")
    private String user;
    @Value("${db.pw}")
    private String pw;

    @Bean
    @Primary
    public DataSource postgresDataSource() {
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName(driver);
        dataSourceBuilder.url(url);
        dataSourceBuilder.username(user);
        dataSourceBuilder.password(pw);
        return dataSourceBuilder.build();
    }

}
