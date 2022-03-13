package com.example.ISISCapitalistJuliagathe;

import com.example.ISISCapitalistJuliagathe.world.PallierType;
import com.example.ISISCapitalistJuliagathe.world.ProductType;
import com.example.ISISCapitalistJuliagathe.world.TyperatioType;
import com.example.ISISCapitalistJuliagathe.world.World;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Services {

    World readWorldFromXml(String pseudo) throws JAXBException {
        World w = null;
        //System.out.println("readWorldFromXml" + pseudo);
        InputStream input = getClass().getClassLoader().getResourceAsStream(pseudo + "-world.xml");
        if (input == null) {
            input = getClass().getClassLoader().getResourceAsStream("world.xml");
        }
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            w = (World) u.unmarshal(input);
            //System.out.println(w.getName());
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return w;
    }

    void saveWorldToXml(World world, String pseudo) {
        try {
            //System.out.println("saveWorldToXml " + pseudo);
            OutputStream output = new FileOutputStream(new File("./src/main/resources/" + pseudo + "-world.xml"));
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            m.marshal(world, output);
        } catch (FileNotFoundException | JAXBException e) {
            e.printStackTrace();
        }
    }

    World getWorld(String pseudo) {
        try {
            World w = readWorldFromXml(pseudo);
            w=majScore(w);
            saveWorldToXml(w, pseudo);
            return w;
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
            //System.out.println("prod"+product.getCout()+" qtechange "+qtchange+ " money "+world.getMoney());
            double moneySpent;
            moneySpent = product.getCout() * ((Math.pow(newproduct.getCroissance(), qtchange)-1) / (newproduct.getCroissance() - 1));
            world.setMoney(world.getMoney() - moneySpent);
            product.setQuantite(newproduct.getQuantite());
            product.setCout(Math.round((newproduct.getCout()*(Math.pow(newproduct.getCroissance(), qtchange+1))*100)/100));
            world.setScore(world.getScore() + newproduct.getRevenu() * newproduct.getQuantite());
            world.setMoney(world.getMoney() + newproduct.getRevenu() * newproduct.getQuantite());
            //System.out.println("argent " + world.getMoney() + " qte " + product.getQuantite()+" money spent "+moneySpent);
        } else {
            //changer score qd fini
            product.setTimeleft(product.getVitesse());
            product.setManagerUnlocked(newproduct.isManagerUnlocked());
            //world.setMoney(world.getMoney()+product.getRevenu()*product.getQuantite());
            // System.out.println("debut de prod score " + world.getScore() + " money  " + world.getMoney());
        }
        world.setLastupdate(System.currentTimeMillis());
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
                //System.out.println("Le produit  "+p.getName()+" a été trouvé.");
                return p;
            }
        }
        System.out.println("Le produit  "+id+" n'a pas été trouvé.");
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
            System.out.println("Le manager "+newmanager.getName()+" n'a pas été trouvé.");
            return false;
        }
        // débloquer ce manager
        manager.setUnlocked(true);
        //System.out.println("Le manager "+newmanager.getName()+" a été trouvé.");
        // trouver le produit correspondant au manager
        ProductType product = findProductById(world, manager.getIdcible());
        if (product == null) {
            return false;
        }
        // débloquer le manager de ce produit
        product.setManagerUnlocked(true);
        //System.out.println("Le manager est-il bien débloqué ? "+product.isManagerUnlocked());
        if(product.getQuantite()>0){
           product.setTimeleft(product.getVitesse());
        }
        // soustraire de l'argent du joueur le cout du manager
        world.setMoney(world.getMoney() - manager.getSeuil());
        // sauvegarder les changements au monde
        saveWorldToXml(world, username);
        return true;
    }

    /**
     * Retourne le manager du monde en fonction de son nom
     *
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
        return null;
    }

    private World majScore(World world) {
        long tpsEcoule = System.currentTimeMillis() - world.getLastupdate();
        if(findProductById(world,1).isManagerUnlocked()){
            System.out.print("yeess");
        }
        world.getProducts().getProduct().forEach((ProductType prod) -> {
            if (prod.getQuantite() > 0) {
                //System.out.println("tpsecoule " + tpsEcoule + " timeleft " + prod.getTimeleft());
                if (!prod.isManagerUnlocked() && (prod.getTimeleft() != 0)) {
                    ///System.out.println("manager pas unlock"+prod.getName()+prod.isManagerUnlocked());
                    if (prod.getTimeleft() < tpsEcoule) {
                        world.setScore(world.getScore() + prod.getRevenu() * prod.getQuantite());
                        world.setMoney(world.getMoney() + prod.getRevenu() * prod.getQuantite());
                        prod.setTimeleft(0);
                    } else {
                        //prod pas encore finie, change timeleft
                        prod.setTimeleft(prod.getTimeleft() - tpsEcoule);
                    }
                } else if (prod.isManagerUnlocked()) {
                    //System.out.println("manager unlock");
                    int nbProd = (int) Math.floorDiv(tpsEcoule, prod.getVitesse());
                    prod.setTimeleft(tpsEcoule-(prod.getVitesse()*nbProd));
                    //prod.setTimeleft((prod.getVitesse()-prod.getTimeleft())/prod.getVitesse());
                    world.setScore(world.getScore() + (prod.getRevenu() * prod.getQuantite()) * nbProd++);
                    world.setMoney(world.getMoney() + (prod.getRevenu() * prod.getQuantite()) * nbProd++);
                }
            }
        });
        world.setLastupdate(System.currentTimeMillis());
        return world;
    }

     // prend en paramètre le pseudo du joueur et le manager acheté.
    // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateUnlock(String username, PallierType newunlock) {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);

        PallierType unlock = findUnlockByName(world, newunlock.getName());
        if (unlock == null) {
            return false;
        }
        // on débloque le unlock
        unlock.setUnlocked(true);
        // trouver le produit correspondant au unlock
        ProductType product = findProductById(world, unlock.getIdcible());
        if (product == null) {
            return false;
        }
        // débloquer le unlock de ce produit
        product.getPalliers().getPallier().add(unlock);
        if(unlock.getTyperatio()==TyperatioType.VITESSE){
            //plus vite
        }else if(unlock.getTyperatio()==TyperatioType.GAIN){
            //gagne plus
        }else{
            //ange
        }
        world=majScore(world);
        // sauvegarder les changements au monde
        saveWorldToXml(world, username);
        return true;
    }
    
    /**
     * Retourne le unlock du monde en fonction de son nom
     *
     * @param unlock le unlock
     * @param name le nom du unlock
     * @return le unlock, null sinon
     */
    private PallierType findUnlockByName(World world, String name) {
        for (PallierType u : world.getAllunlocks().getPallier()) {
            if (name.equals(u.getName())) {
                return u;
            }
        }
        return null;
    }

    
     // prend en paramètre le pseudo du joueur et le manager acheté.
    // renvoie false si l’action n’a pas pu être traitée
    public Boolean updateAngel(String username, PallierType newangel) {
        // aller chercher le monde qui correspond au joueur
        World world = getWorld(username);
        // trouver dans ce monde, le manager équivalent à celui passé
        // en paramètre
        PallierType angel = findAngelByName(world, newangel.getName());
        if (angel == null) {
            return false;
        }
        // débloquer cet ange
        angel.setUnlocked(true);
        world.setActiveangels(world.getActiveangels()+1);
        // sauvegarder les changements au monde
        saveWorldToXml(world, username);
        return true;
    }
    
    /**
     * Retourne l'ange du monde en fonction de son nom
     *
     * @param ange l'ange
     * @param name le nom de l'ange
     * @return l'ange, null sinon
     */
    private PallierType findAngelByName(World world, String name) {
        for (PallierType a : world.getAngelupgrades().getPallier()) {
            if (name.equals(a.getName())) {
                return a;
            }
        }
        return null;
    }

}
