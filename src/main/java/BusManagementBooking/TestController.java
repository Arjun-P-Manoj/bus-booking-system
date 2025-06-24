package BusManagementBooking.bus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/check-db")
    public String checkDatabase() {
        try (Connection conn = dataSource.getConnection()) {
            return "✅ Connected to: " + conn.getMetaData().getURL();
        } catch (SQLException e) {
            return "❌ Failed to connect to DB: " + e.getMessage();
        }
    }
}
