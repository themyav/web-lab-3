package managedBeans;

import entity.Rowx;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@ManagedBean(name ="areaCheck")
public class ResultController implements Serializable{
    private static final long serialVersionUID = 1L;
    private String x;
    private String  y;
    private String r;


    public String getCheckResult(){
        Rowx rowx = new Rowx(); //создаем новую строку
        if(x == null || y == null || r == null) return "Start";
        double X = Double.parseDouble(x); //replace , .
        double Y = Double.parseDouble(y);
        double R = Double.parseDouble(r);

        rowx.setX(X);
        rowx.setY(Y);
        rowx.setR(R);

        long currentTime = System.currentTimeMillis();
        rowx.setResult(rowx.isInArea(X, Y, R));
        rowx.setTime((System.currentTimeMillis() - currentTime) / 1000.0);
        rowx.setDate(LocalDateTime.now().toString());

        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(rowx);
        entityManager.getTransaction().commit();
        entityManager.close();
        entityManagerFactory.close();
        return Objects.equals(x, "1") ? "OKey " + x + " " + y + " " + r : "NOT OK" + x + " " + y + " " + r;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }


    public void setResult(boolean result) {
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }
}
