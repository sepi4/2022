namespace _11Test;

public class UnitTest1
{
    [Fact]
    public void Test_Sum2()
    {
        
        Assert.Equal(3, Program.Sum2(1, 2));
        Assert.Equal(0, Program.Sum2(-2, 2));
        Assert.Equal(-1, Program.Sum2(-2, 1));

    }
}