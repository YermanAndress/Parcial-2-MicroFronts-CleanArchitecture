package uceva.cleanarchitecture.domain.entity;

public class User {
    public Integer id;
    public String name;
    public String lastName;
    public Integer age;
    public String email;
    public String engineering;

    public User(Integer id, String name, String lastName, Integer age, String email, String engineering){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this. email = email;
        this.engineering = engineering;
    }

}

