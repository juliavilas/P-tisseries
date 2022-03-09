package com.example.ISISCapitalistJuliagathe;

import com.example.ISISCapitalistJuliagathe.world.PallierType;
import com.example.ISISCapitalistJuliagathe.world.ProductType;
import com.example.ISISCapitalistJuliagathe.world.World;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Services {

    World readWorldFromXml(String pseudo) throws JAXBException {
        World w = null;
        System.out.println("readWorldFromXml"+pseudo);
        InputStream input = getClass().getClassLoader().getResourceAsStream(pseudo + "-world.xml");
        if (input == null) {
            System.out.println("HELP C NULL");
            input = getClass().getClassLoader().getResourceAsStream("world.xml");
            System.out.println("ok "+input);
        }
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            w = (World) u.unmarshal(input);
            //System.out.println(w.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return w;
    }

    void saveWorldToXml(World world, String pseudo) {
        try {
            System.out.println("saveWorldToXml "+pseudo);
            OutputStream output = new FileOutputStream(new File("./src/main/resources/"+pseudo + "-world.xml"));
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            m.marshal(world, output);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    World getWorld(String pseudo) {
        try {
            return readWorldFromXml(pseudo);
        } catch (JAXBException ex) {
            Logger.getLogger(Services.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // prend en paramètre le pseudo du joueur et le produit
    // sur lequel une action a eu lieu (lancement manuel de production ou
    // achat d’une certaine quantité de produit)
    // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateProduct(String username, ProductType newproduct) {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);
        // trouver dans ce monde, le produit équivalent à celui passé
        // en paramètre
        ProductType product = findProductById(world, newproduct.getId());
        if (product == null) {
            //System.out.println("updateProduct : produit null");
            return false;
        }
        // calculer la variation de quantité. Si elle est positive c'est
        // que le joueur a acheté une certaine quantité de ce produit
        // sinon c’est qu’il s’agit d’un lancement de production.
        int qtchange = newproduct.getQuantite() - product.getQuantite();
        if (qtchange > 0) {
            // soustraire de l'argent du joueur le cout de la quantité
            // achetée et mettre à jour la quantité de product
            // ACHANGER
            //System.out.println("updateProduct : produit non null");
            double moneySpent;
            moneySpent = Math.round(newproduct.getCout()*((Math.pow(newproduct.getCroissance(),newproduct.getQuantite())/(newproduct.getCroissance()-1))));
            world.setMoney(world.getMoney() - moneySpent);
            //world.setScore(product.getCout());
            product.setQuantite(product.getQuantite()+qtchange);
        } else {
            //changer score qd fini
            product.setTimeleft(product.getVitesse());
        }
        // sauvegarder les changements du monde
        saveWorldToXml(world, username);
        return true;
    }

    /**
     * Retourne le produit correspondant à l'id donné dans le monde donné S'il
     * n'y en a pas, retourne null
     *
     * @param world le monde
     * @param id l'id du produit
     * @return le produit ou null
     */
    private ProductType findProductById(World world, int id) {
        for (ProductType p : world.getProducts().getProduct()) {
            if (id == p.getId()) {
                return p;
            }
        }
        return null;
    }

    // prend en paramètre le pseudo du joueur et le manager acheté.
    // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateManager(String username, PallierType newmanager) {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);
        // trouver dans ce monde, le manager équivalent à celui passé
        // en paramètre
        PallierType manager = findManagerByName(world, newmanager.getName());
        if (manager == null) {
            return false;
        }
        // débloquer ce manager
        manager.setUnlocked(true);
        // trouver le produit correspondant au manager
        ProductType product = findProductById(world, manager.getIdcible());
        if (product == null) {
            return false;
        }
        // débloquer le manager de ce produit
        product.setManagerUnlocked(true);
        // soustraire de l'argent du joueur le cout du manager
        world.setMoney(world.getMoney()-manager.getSeuil());
        // sauvegarder les changements au monde
        saveWorldToXml(world, username);
        return true;
    }
    
    /**
    * Retourne le manager du monde en fonction de son nom
    * @param world le monde
    * @param name le nom du manager
    * @return le manager, null sinon
    */
    private PallierType findManagerByName(World world, String name) {
        for (PallierType m : world.getManagers().getPallier()) {
            if (name.equals(m.getName())) {
                return m;
            }
        }
        return null;    }

}
