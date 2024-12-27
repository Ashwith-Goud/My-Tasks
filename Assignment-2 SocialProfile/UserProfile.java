import java.util.*;

class UserProfile {
    private int userId;
    private String name;
    private int phone;
    private List<String> friends = new LinkedList<>();
    private List<String> followers = new LinkedList<>();

    public UserProfile(int userId, String name, int phone) {
        this.userId = userId;
        this.name = name;
        this.phone = phone;
    }

    public int getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void addFriend(String friendName) {
        friends.add(friendName);
    }

    public void addFollower(String followerName) {
        followers.add(followerName);
    }

    public void removeFriend(String friendName) {
        friends.remove(friendName);
    }

    public List<String> getFriends() {
        return friends;
    }

    public List<String> getFollowers() {
        return followers;
    }

    public int getPhonenumber() {
        return phone;
    }
}
