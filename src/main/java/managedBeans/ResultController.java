package managedBeans;

import entity.Rowx;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;


@ManagedBean(name ="areaCheck")
@ApplicationScoped
public class ResultController implements Serializable{
    private static final long serialVersionUID = 1L;
    private static final int DELETE = 0;
    private static final int CREATE = 1;

    private EntityManager entityManager;
    private String x;
    private String  y;
    private String r;
    
    private List<Rowx> rows;

    Rowx createRow(){
        double currentTime = System.nanoTime();
        Rowx rowx = new Rowx();
        if(x == null || y == null || r == null) return null;
        x = x.replace(',', '.');
        //x = "3";
        double X = Double.parseDouble(x);
        double Y = Double.parseDouble(y);
        double R = Double.parseDouble(r);

        rowx.setX(X);
        rowx.setY(Y);
        rowx.setR(R);

        rowx.setResult(rowx.isInArea(X, Y, R));
        rowx.setTime((System.nanoTime() - currentTime) / 1e6);//((currentTime == System.currentTimeMillis() ? 0.1 : 0.2)); //(currentTime - System.currentTimeMillis()) * 1e6);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        rowx.setDate(LocalDateTime.now().format(formatter));
        return rowx;
    }

    public void addRow(Rowx row){
        entityManager.getTransaction().begin();
        entityManager.persist(row);
        entityManager.getTransaction().commit();
    }

    public void deleteRows(){
        if(rows != null) {
            entityManager.getTransaction().begin();
            for(Rowx r: rows){
                entityManager.remove(entityManager.find(Rowx.class, r.getId()));
            }
            entityManager.getTransaction().commit();

            rows.clear();
        }
    }

    private void initRows(){
        if(rows != null) rows.clear();
        rows = entityManager.createQuery("SELECT e FROM Rowx e").getResultList();
        rows.sort(Comparator.comparing(Rowx::getDate));
        Collections.reverse(rows);

    }

    public String getProcess(int code){

        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("database");
        entityManager = entityManagerFactory.createEntityManager();

        if(code == DELETE) {
            deleteRows();
            return "?????????????? ??????????????";
        }
        else if(code == CREATE){
            Rowx rowx = createRow();
            if(rowx != null) addRow(rowx);
            initRows();
            if(rowx == null) return "";
            else return rowx.getResult()  ? "??????????????????" : "????????????";
        }
        entityManager.close();
        entityManagerFactory.close();
        return "???????????????????????? ????????????";
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
