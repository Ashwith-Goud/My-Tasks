import java.util.*;

class SocialPlatform {

    private Map<Integer, UserProfile> userProfiles = new LinkedHashMap<>();
    private Set<String> trendingHashtags = new LinkedHashSet<>();

    public void addUser(int userId, String name, int phone) {
        if (!userProfiles.containsKey(userId)) {
            userProfiles.put(userId, new UserProfile(userId, name, phone));
            System.out.println("User Added Successfully.");
        } else
            System.out.println("User already Exists.");
    }

    public void addaFriend(int userId, String friendName) {
        UserProfile user = userProfiles.get(userId);

        if (user != null) {
            if (findUser(friendName)) {
                user.addFriend(friendName);
                System.out.println("Friend Added Successfully.");
            } else
                System.out.println("You can only add existing user as a friend.");
        } else {
            System.out.println("User not Found");
        }
    }

    public boolean findUser(String name) {
        for (UserProfile p : userProfiles.values()) {
            if (p.getName().equals(name)) {
                return true;
            }
        }
        return false;
    }

    public void addaFollower(int userId, String followerName) {
        UserProfile user = userProfiles.get(userId);
        if (user != null)
            user.addFollower(followerName);
    }

    public void removeaFriend(int userId, String friendName) {
        UserProfile user = userProfiles.get(userId);
        if (user != null) {
            user.removeFriend(friendName);
        }
    }

    public void addHashtag(String hashtag) {
        trendingHashtags.add(hashtag);
    }

    public Set<String> getTrendingHashtags() {
        return trendingHashtags;
    }

    public UserProfile getuserProfile(int userId) {
        return userProfiles.get(userId);
    }

    public List<String> getFollowers(int userId) {
        UserProfile user = userProfiles.get(userId);
        return user != null ? user.getFollowers() : new ArrayList<>();
    }

    public void getAllusers() {
        for (UserProfile up : userProfiles.values()) {
            StringJoiner joiner = new StringJoiner(",");
            for (String s : up.getFriends())
                joiner.add(s);
            StringJoiner joiner1 = new StringJoiner(",");
            for (String s : up.getFollowers())
                joiner1.add(s);
            System.out.println("UserId :" + up.getUserId());
            System.out.println("UserName :" + up.getName());
            System.out.println("Friends :" + joiner);
            System.err.println("Followers :" + joiner1);
        }
    }

    public int getNumber(int userId) {
        System.out.println("User Phone Number.");
        return userProfiles.get(userId).getPhonenumber();
    }
}
