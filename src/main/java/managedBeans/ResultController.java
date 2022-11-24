package managedBeans;

import entity.Rowx;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@ManagedBean(name ="areaCheck")
public class ResultController implements Serializable{
    private static final long serialVersionUID = 1L;
    private String x;
    private String  y;
    private String r;

    private RowDB connector;

    private List<Rowx> rows;

    public void createRow(Rowx row){
        javax.persistence.EntityManagerFactory entityManagerFactory = javax.persistence.Persistence.createEntityManagerFactory("default");
        javax.persistence.EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(row);
        entityManager.getTransaction().commit();
        entityManager.close();
        entityManagerFactory.close();
    }


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

        //connector = new RowDB();
        //createRow(rowx);
        //rows = getRows();
        if(rows != null) rows.clear();
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(rowx);
        entityManager.getTransaction().commit();
        rows = entityManager.createQuery("SELECT e FROM Rowx e").getResultList();
        Collections.reverse(rows);
        StringBuilder s = new StringBuilder();
        for(Rowx rowx1 : rows){
            s.append(rowx1.getX()).append(" ").append(rowx1.getY()).append("\n");
        }
        entityManager.close();
        entityManagerFactory.close();
        return "Data processed";
        //return Objects.equals(x, "1") ? "OKey " + x + " " + y + " " + r : "NOT OK" + x + " " + y + " " + r;
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

    public List<Rowx> getRows() {
        return rows;
    }
}
